/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import packageJson from "./configFiles/packageJsonConfig.js";
import eslintConfig from "./configFiles/eslintConfig.js";
import prettierConfig from "./configFiles/prettierConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const exec = promisify(execCallback);

(async () => {
  try {
    const folderName = process.argv[2];
    const regex = /[^L\d]/g;

    const safeFolderName = folderName.replace(regex, "");

    const validRegex = /^L\d{1,3}$/;

    if (!validRegex.test(safeFolderName)) {
      throw new Error(
        "Invalid folder name. It must start with 'L' followed by a 1 to 3 digit number.",
      );
    }

    const parentDir = dirname(__dirname);
    const projectPath = join(parentDir, safeFolderName);

    const { stdout: mkdirOut, stderr: mkdirErr } = await exec(
      `mkdir ${safeFolderName}`,
      {
        cwd: parentDir,
        timeout: 1000 * 60 * 5,
      },
    );

    console.log("mkdir stdout: ", mkdirOut);
    if (mkdirErr) console.log("mkdir stderr: ", mkdirErr);

    const { stdout: npmInitOut, stderr: npmInitErr } = await exec(
      "npm init -y",
      {
        cwd: projectPath,
        timeout: 1000 * 60 * 5,
      },
    );

    console.log("npm init stdout: ", npmInitOut);
    if (npmInitErr) console.log("npm init stderr: ", npmInitErr);

    const packagePath = join(projectPath, "package.json");
    await writeFile(
      packagePath,
      JSON.stringify(packageJson(safeFolderName), null, 2),
      "utf8",
    );

    const eslintPath = join(projectPath, ".eslintrc.cjs");
    await writeFile(eslintPath, eslintConfig, "utf8");

    const prettierPath = join(projectPath, ".prettierrc");
    await writeFile(
      prettierPath,
      JSON.stringify(prettierConfig, null, 2),
      "utf8",
    );

    const { stdout: npmInstallOut, stderr: npmInstallErr } = await exec(
      "npm install",
      {
        cwd: projectPath,
        timeout: 1000 * 60 * 5,
      },
    );

    console.log("npm install stdout: ", npmInstallOut);
    if (npmInstallErr) console.log("npm install stderr: ", npmInstallErr);
  } catch (error) {
    console.log("Error: ", error);
  }
})();
