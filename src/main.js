#!/usr/bin/env node
const { Command } = require("commander");
const init = require("./modules/init.js");
const search = require("./modules/search.js");
const organise = require("./modules/organise.js");
const scan = require("./modules/scan.js");
const figlet = require("figlet");
const program = new Command();

let initialized = false;

const showBanner = () => {
	if (!initialized) {
		console.log(
			figlet.textSync("ORGANIZER", {
				font: "Standard",
				horizontalLayout: "default",
				verticalLayout: "default"
			})
		);
	}
};

program
	.name("File Organizer")
	.description("File Organizer Tool")
	.version("1.0.0")
	.usage("[options] <directory...>");

program
	.command("init")
	.description("Initializes the file organizer in the directory specified.")
	.option(
		"-d,--directory <directory...>",
		"Specify a custom directory to Initialize."
	)
	.action(options => {
	  showBanner()
	  init(options.directory)
	  
	});

program
	.command("scan")
	.description("Scan the directory for files to organize")
	.option(
		"-d,--directory <directory...>",
		"Specify a custom directory to scan"
	)
	.action(options => scan(options.directory));

program
	.command("organize")
	.description("Organize files according to the configuration")
	.option(
		"-d,--directory <directory...>",
		"Specify a custom directory organize"
	)
	.action(options => organise(options.directory));

program
	.command("search <query>")
	.description("searches for files by name or extension")
	.option(
		"-d,--directory <directory>",
		"Specify a custom directory to search in."
	)
	.action((query, options) => search(query, options));

program.parse(process.argv);
