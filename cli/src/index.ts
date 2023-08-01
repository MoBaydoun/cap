import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { Command } from "commander";

import { getVersion, getAppName } from "./utils.js";
import ExpressHTTPInstaller from "./installers/ExpressHTTP.js";
import ExpressPrismaHTTPInstaller from "./installers/ExpressPrismaHTTP.js";

const program = new Command();
const cliResults: CLI = {
    appName: "",
    flags: {
        template: "ExpressHTTP",
    },
};

const setup = () => {
    program
        .name("cli-test")
        .version(
            getVersion(),
            "-v, --version",
            chalk.blue("Display the version number.")
        )
        .description("Testing a cli application.")
        .parse(process.argv);

    return program.opts();
};

const promptAppName = async () => {
    const { appName } = await inquirer.prompt<Pick<CLI, "appName">>({
        name: "appName",
        type: "input",
        message: "What is the name of your app?",
        default: getAppName(),
        transformer: (input: string) => input.trim(),
    });

    return appName;
};

const promptTemplate = async () => {
    const { template } = await inquirer.prompt<Pick<CLIFlags, "template">>({
        name: "template",
        type: "list",
        message: "What template would you like to use today?",
        default: "ExpressHTTP",
        choices: [
            {
                name: "Express.js HTTP Server",
                value: "ExpressHTTP",
                short: "Express.js HTTP Server",
            },
            {
                name: "Express.js + Prisma HTTP Server",
                value: "ExpressPrismaHTTP",
                short: "Express.js + Prisma HTTP Server",
            },
        ],
    });

    return template;
};

const scaffoldProject = async () => {
    const projectPath = path.join(
        globalThis.__dirname,
        `../${cliResults.appName}`
    );
    fs.mkdirSync(projectPath);

    const packageJSON: PackageJSON = {
        name: cliResults.appName,
        version: "1.0.0",
        dependencies: {},
        devDependencies: {},
    };

    switch (cliResults.flags.template) {
        case "ExpressHTTP":
            Object.assign(packageJSON, ExpressHTTPInstaller);
            break;
        case "ExpressPrismaHTTP":
            Object.assign(packageJSON, ExpressPrismaHTTPInstaller);
            break;
    }

    fs.writeFileSync(
        `${projectPath}/package.json`,
        JSON.stringify(packageJSON, null, 2)
    );
};

const main = async () => {
    console.log(chalk.blue(figlet.textSync("Howdy!")));

    setup();
    cliResults.appName = await promptAppName();
    cliResults.flags.template = await promptTemplate();

    await scaffoldProject();
};

await main();
