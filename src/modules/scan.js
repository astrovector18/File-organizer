const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
module.exports = directories => {
	const dirs = directories || [process.cwd()];
	try {
		dirs.forEach(dir => {
			if (!fs.existsSync(dir)) {
				throw new Error("Directory does not exist.");
			}
			const configFilePath = path.join(dir, "file-organizer.config.json");

			if (!fs.existsSync(configFilePath)) {
				throw new Error(
					"No config file for this directory, please initialize one using `init`"
				);
			}
			const config = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));

			const files = fs.readdirSync(dir);
			/*********@@@@ ********/

			const ignoreFiles = ["main.js", "file-organizer.config.json"];

			let isNotOrganised = true;

			files.forEach(file => {
				/*********@@@@ ********/

				const filePath = path.join(dir, file);
				const fileStats = fs.statSync(filePath);

				/*********@@@@ ********/

				if (fileStats.isFile() && !ignoreFiles.includes(file)) {
					/*********@@@@ ********/
					const fileExt = path.extname(file);
					const destDir =
						config.extensions[fileExt] || config.defaultDir;

					if (destDir) {
						console.log(
							chalk.green(
								`${chalk.white.bold(
									"File"
								)}: ${file} ---> ${chalk.white.bold(
									"Destination"
								)}: ${destDir}\n`
							)
						);
					}
					isNotOrganised = false;
					fileProcessed = 0;
				}
			});
			if (isNotOrganised) {
				console.log(chalk.yellow(`No files in this directory 💡`));
			}
		});
	} catch (err) {
		console.log(chalk.red(`${chalk.bold("Error")}:${err.message}`));
	}
};
