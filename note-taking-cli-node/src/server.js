import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import open from "open";

const interpolate = (html, data) => {
	return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
		return data[placeholder] || "";
	});
};

export const formatNotes = (notes) => {
	return notes
		.map((note) => {
			return `
		<div class="note">
		    <p>${note.content}</p>
		    <div class="tags">
			${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
		    </div>
		</div>
	    `;
		})
		.join("\n");
};

export const createServer = (notes) => {
	return http.createServer(async (req, res) => {
		const __dirname = import.meta.dirname;
		const HTML_PATH = path.resolve(__dirname, "./template.html");
		const template = await fs.readFile(HTML_PATH, "utf-8");
		const html = interpolate(template, { notes: formatNotes(notes) });

		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(html);
	});
};

export const start = (notes, port) => {
	const server = createServer(notes);
	const address = `http://localhost:${port}`;
	server.listen(port, () => {
		console.log(`Server is listening on port ${address}`);
	});
	open(address);
};
