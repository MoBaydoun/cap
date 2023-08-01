import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = path.dirname(__filename);

const packageJSON = JSON.parse(
    fs
        .readFileSync(path.join(globalThis.__dirname, "../package.json"))
        .toString()
) as PackageJSON;

const dependencyMap: { [key: string]: string } = {
    // prod dependencies
    express: "^4.18.2",
    cors: "^2.8.5",
    "@prisma/client": "^5.0.0",

    // dev dependencies
    typescript: "^5.1.6",
    "ts-node": "^10.9.1",
    prisma: "^5.0.0",

    // types, also dev dependencies
    "@types/express": "^4.17.17",
    "@types/node": "^20.4.5",
    "@types/cors": "^2.8.13",
};

export const getVersion = (): string => {
    return packageJSON["version"] ?? "9.9.9";
};

export const getAppName = (): string => {
    return packageJSON["name"] ?? "default";
};

export const map = (dependencyList: string[]) => {
    const obj = {};
    dependencyList.forEach((dep) =>
        Object.assign(obj, { [dep]: dependencyMap[dep] })
    );
    return obj;
};
