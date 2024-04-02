// Even with defer, it's better to wait for this event before manipulating the DOM.
// "load" waits for everything to be loaded. "DOMContent Loaded" only waits for the DOM to be loaded.
// window.addEventListener("DOMContentLoaded", () => {
//	let nav = document.querySelector("nav");
//	console.log(nav);
// });

// const $ = () => document.querySelector.call(this, arguments);
// const $$ = () => document.querySelectorAll.call(this, arguments);
// HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);
// HTMLElement.prototype.off = (a, b) => this.removeEventListener(a, b);
// HTMLElement.prototype.$ = (s) => this.querySelector(s);
// HTMLElement.prototype.$ = (s) => this.querySelectorAll(s);

import "./register.js";
import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {
	loadData();
	app.router.init();
});

// We have to use window and not document because of the shadow DOM.
window.addEventListener("appcartchange", (event) => {
	const badge = document.querySelector("#badge");
	const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
	badge.textContent = qty;
	badge.hidden = qty == 0;
});
