const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const config = JSON.parse(
	fs.readFileSync(`${__dirname}/../file-organizer.config.json`, "utf-8")
);
module.exports = (directories=[process.cwd()]) => {
	const dirs = Array.isArray(directories) ? directories : [directories];

	dirs.forEach(dir => {
		try {
			if (!fs.existsSync(dir)) {
				throw new Error("This directory doesnt exist.");
			}
			const configFilePath = path.join(dir, "file-organizer.config.json");

			if (!fs.existsSync(configFilePath)) {
				fs.writeFileSync(
					configFilePath,
					JSON.stringify(config, null, 2),
					"utf-8"
				);

				console.log(`Initialised configuration file for ${chalk.cyan.bold(dir)}`);
			} else {
				throw new Error(
					`configuration file already exist for ‘${dir}’`
				);
			}
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	});
};
