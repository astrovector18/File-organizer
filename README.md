# File Organizer 1.0

> The `file-organizer` tool is a command-line utility designed to help you
> efficiently organize your files and directories. With its simple and intuitive
> interface, you can easily scan, categorize, and move files into designated
> folders based on their extensions.

## Key Features

-   Scan: Quickly scan a directory for files and subdirectories.
-   Organize: Automatically move files into folders based on their extensions (e.g., images, documents, videos, etc.).
-   Customizable: Specify custom file extensions and destination folders to fit your needs.
-   Recursive: Scan and organize files in subdirectories.

## Benefits

-   Save time and effort by automating file organization.
-   Keep your files structured and easily accessible.
-   Reduce clutter and improve productivity.

## Installation

For this program to run , you must have nodejs and git installed. To install
them , copy , paste and execute the following command :

```bash
$ apt install nodejs

$ apt install git

```

### Using Git

```sh
$ git clone https://www.git.com

$ cd file-organizer

$ npm install -g

```

## Usage

### Initialize

Initialize the tool with the target directory:

```bash
$ file-organizer init -d /path/to/directory
```

### Scan

Scans a directory for files and directories:

```bash
$ file-organizer scan -d /path/to/directory
```

### Organize

Organize files into directories based on their extensions:

```bash
$ file-organizer organize -d /path/to/directory
```

## Options

-   `-d <directory>`: Specifies the target directory.
-   when the `-d` is not specified, the tools takes the current working
directory into account

### Contributing

Contributions are welcome! Please submit a pull request.
