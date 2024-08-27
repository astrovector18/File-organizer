const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
module.exports = (query, options) => {
	try {
		const files = [];
		const directories = [options.directory || process.cwd()];
		while (directories.length) {
			const dir = directories.shift();
			const dirFiles = fs.readdirSync(dir);
			dirFiles.forEach(dirFile => {
				const filePath = path.join(dir, dirFile);
				const fileStats = fs.statSync(filePath);
				if (fileStats.isDirectory()) {
					directories.push(filePath);
				} else {
					const fileExt = path.extname(dirFile);
					const fileName = path.basename(dirFile, fileExt);
					if (fileName.includes(query) || fileExt.includes(query)) {
						files.push(filePath);
					}
				}
			});
		}
		if (files.length) {
			console.log(
				`\nFound ${files.length} files matching ${chalk.cyan.bold(
					query
				)}\n`
			);
			files.forEach(file => console.log(chalk.dim(file)));
		} else {
			console.log(
				chalk.yellow(`\nNo files matching ${chalk.cyan.bold(query)}\n`)
			);
		}
	} catch (err) {}
};
