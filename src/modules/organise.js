const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

module.exports = directories => {
	const dirs = directories || [process.cwd()];

	try {
		dirs.forEach(dir => {
			/* checks if the given Directory exists */
			if (!fs.existsSync(dir)) {
				throw new Error("Directory does not exist.");
			}
			/* Locates the config file in the given Directory */

			const configFilePath = path.join(dir, "file-organizer.config.json");
			/*----------------------------*/
			const ignoreFiles = ["main.js", "file-organizer.config.json"];
			let isNotOrganised = true;

			// Checks if a config file has been initislized

			if (!fs.existsSync(configFilePath)) {
				throw new Error(
					"No config file for this directory, please initialize one using `init`"
				);
			}

			// Reads the contents of the config file.

			const config = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));

			// Loads all the file present in the current directory [array of file nanes]
			const files = fs.readdirSync(dir);

			// LOOPS over each file
			files.forEach(file => {
				// Excludes the config file

				// Builds a path for the file

				const filePath = path.join(dir, file);

				// Get a stat about the file
				const fileStats = fs.statSync(filePath);

				// Checks if tbe file name is a file

				if (fileStats.isFile() && !ignoreFiles.includes(file)) {
					// Grabs the file extension

					const fileExt = path.extname(file);

					// Decides the folder a file with a corresponding fileExt goes to.

					const destDir =
						config.extensions[fileExt] || config.defaultDir;

					// if such folder exists...?
					if (destDir) {
						// Create a path for the folder
						const destPath = path.join(dir, destDir);

						// If the folder doesnt already exist, create one.
						if (!fs.existsSync(destPath)) {
							fs.mkdirSync(destPath);
						}

						// Move the files that meet the conditions to the  created dir
						fs.renameSync(filePath, path.join(destPath, file));

						console.log(
							chalk.green(
								`\n${chalk.white.bold(
									"Moved"
								)}: ${file} ---> ${chalk.white.bold(
									"Destination"
								)}: ${destDir}\n`
							)
						);
					}
					isNotOrganised = false;
				}
			});
			if (isNotOrganised) {
				console.log(
					chalk.yellow(`No organizable file(s) in this directory 💡`)
				);
			}
		});
	} catch (err) {
		console.log(chalk.red(`${chalk.bold("Error")}:${err.message}`));
	}
};
