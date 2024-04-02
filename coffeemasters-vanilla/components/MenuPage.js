export class MenuPage extends HTMLElement {
	constructor() {
		super();

		// Create a shadow DOM. Open means it is accessible from the outside.
		this.root = this.attachShadow({ mode: "open" });

		const styles = document.createElement("style");
		this.root.appendChild(styles);

		async function loadCSS() {
			const request = await fetch("/components/MenuPage.css");
			const css = await request.text();
			styles.textContent = css;
		}
		loadCSS();
	}
	// When the component is attached to the DOM.
	connectedCallback() {
		const template = document.querySelector("#menu-page-template");
		const content = template.content.cloneNode(true);
		this.root.appendChild(content);

		window.addEventListener("appmenuchange", () => {
			this.render();
		});
		this.render();
	}
	render() {
		if (app.store.menu) {
			const menuCache = this.root.querySelector("#menu");
			menuCache.innerHTML = "";
			for (let category of app.store.menu) {
				const liCategory = document.createElement("li");
				liCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class="category">

                    </ul>
                `;
				menuCache.appendChild(liCategory);

				category.products.forEach((product) => {
					const item = document.createElement("product-item");
					item.dataset.product = JSON.stringify(product);
					liCategory.querySelector("ul").appendChild(item);
				});
			}
		} else {
			menuCache.innerHTML = "Loading...";
		}
	}
}
