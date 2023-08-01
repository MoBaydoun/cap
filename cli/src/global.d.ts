type CLIFlags = {
    template: "ExpressHTTP" | "ExpressPrismaHTTP";
};

type CLI = {
    appName: string;
    flags: CLIFlags;
};

type PackageJSON = {
    name: string;
    version: string;
    dependencies: { [key: string]: string };
    devDependencies: { [key: string]: string };
};
