import { map } from "../utils.js";

const dependencies = ["express", "cors"];
const devDependencies = [
    "@types/node",
    "@types/express",
    "@types/cors",
    "typescript",
    "ts-node",
];

export default {
    dependencies: map(dependencies),
    devDependencies: map(devDependencies),
};
