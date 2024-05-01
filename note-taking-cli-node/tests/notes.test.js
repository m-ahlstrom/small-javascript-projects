import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
	insertDB: jest.fn(),
	getDB: jest.fn(),
	saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

// ! Refreshes the mocks before each test to avoid tests sharing state. We don't want that.
beforeEach(() => {
	insertDB.mockClear();
	getDB.mockClear();
	saveDB.mockClear();
});

describe("cli app", () => {
	test("newNote inserts data and returns it", async () => {
		const data = {
			tags: ["tag1", "tag2"],
			content: "Test note",
			id: Date.now(),
		};
		insertDB.mockResolvedValue(data);

		const result = await newNote(data.content, data.tags);
		// * toEqual is not a triple equal -- it would fail on objects. toEqual just checks if the objects have the same properties, not the same place in memory.
		expect(result).toEqual(data);
	});

	test("getAllNotes returns all notes", async () => {
		const db = {
			notes: ["note1", "note2", "note3"],
		};
		getDB.mockResolvedValue(db);

		const result = await getAllNotes();
		expect(result).toEqual(db.notes);
	});

	test("removeNote does nothing if id is not found", async () => {
		const notes = [
			{ id: 1, content: "note 1" },
			{ id: 2, content: "note 2" },
			{ id: 3, content: "note 3" },
		];
		saveDB.mockResolvedValue(notes);

		const idToRemove = 4;
		const result = await removeNote(idToRemove);
		expect(result).toBeUndefined();
	});
});
