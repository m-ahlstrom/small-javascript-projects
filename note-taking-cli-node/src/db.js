import fs from "node:fs/promises";
import path from "node:path";

// * There is no __dirname when working with ES modules, but we can define it using import.meta.dirname.
const __dirname = import.meta.dirname;
const DB_PATH = path.resolve(__dirname, "../db.json");

export const getDB = async () => {
	const db = await fs.readFile(DB_PATH, "utf-8");
	return JSON.parse(db);
};

export const saveDB = async (db) => {
	await fs.writeFile(DB_PATH, JSON.stringify(db, null, 4));
	return db;
};

export const insertDB = async (note) => {
	const db = await getDB();
	db.notes.push(note);
	await saveDB(db);
	return note;
};
