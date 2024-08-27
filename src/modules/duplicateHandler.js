
// FUTURE UPDATES 🚀



const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
module.exports = () => {
	const directory = ".";
	const hashTable = {};
	let foundDuplicate = false;
	const walkDir = (dir, callback) => {
		const files = fs.readdirSync(dir);

		files.forEach(file => {
			const filePath = path.join(dir, file);
			const fileStats = fs.statSync(filePath);

			if (fileStats.isFile()) {
				walkDir(dir, callback);
			} else {
				callback(filePath);
			}
		});
	};

	const getFileHash = filePath => {
		const hash = crypto.createHash("md5");
		const stream = fs.createReadStream(filePath);

		stream.on("data", chunk => hash.update(chunk));
		stream.on("end", chunk => {
			const fileHash = hash.digest("hex");
		return fileHash;
		});
	};

	walkDir(directory, filePath => {
		const fileHash = getFileHash(filePath);
		if (hashTable[fileHash]) {
			foundDuplicate = true;
			console.log(
				`Duplicate Found : ${filePath} same as ${hashTable[fileHash]}`
			);
		} else {
			hashTable[fileHash] = filePath;
		}
		if (!foundDuplicate) {
			console.log("No duplicates found");
		}
	});
};
