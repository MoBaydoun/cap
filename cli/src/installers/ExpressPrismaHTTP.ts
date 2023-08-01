import { map } from "../utils.js";

const dependencies = ["express", "cors", "@prisma/client"];
const devDependencies = [
    "@types/node",
    "@types/express",
    "@types/cors",
    "prisma",
    "typescript",
    "ts-node",
];

export default {
    dependencies: map(dependencies),
    devDependencies: map(devDependencies),
};
