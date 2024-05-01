# Note Taking CLI in Node.js

A note taking CLI application built with Node.js. You can create notes, read or delete your notes, and launch a web server to see your notes in a browser. The notes are saved to the file system inside `db.json`.

The code in this project is based on the [Introduction to Node.js](https://frontendmasters.com/courses/node-js-v3/) course by Scott Moss from [Frontend Masters](https://www.frontendmasters.com).

## Run it locally

Int the project directory, run

```sh
npm link
```

This will let you use the `knote` command in your terminal.

Then use knote with the different arguments it takes.

## Running tests

In the project folder run

```sh
npm test
```

## Usage

Create a new note. You can use `-t` or `--tags` to create tags, but it's optional.

```sh
knote new "your text here"
```

List all your notes.

```sh
knote all
```

Search for a specific note based on a filter. The filter must be a string as it searches in the note body.

```sh
knote find "your filter here"
```

Remove a specific note by id.

```sh
knote remove <id>
```

Remove all your notes.

```sh
knote clean
```

Launch a website to see your notes on the specified port, default is 4000.

```sh
knote web [port]
```
