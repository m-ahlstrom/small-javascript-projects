const Router = {
	init: () => {
		// First, we need to prevent to browser from reloading the page when clicking to a link.
		// The we need to get url path, so that we can forward the user ourselves.
		document.querySelectorAll("a.navlink").forEach((a) => {
			a.addEventListener("click", (event) => {
				event.preventDefault();
				// const url = a.href;
				// const url = event.target.href;
				// const url = a.getAttribute("href");
				const url = event.target.getAttribute("href");
				Router.go(url);
			});
		});
		// Event handler for URL changes. The event has a state that we pushed, that has the path.
		window.addEventListener("popstate", (event) => {
			Router.go(event.state.path, false);
		});
		// Check the initial URL.
		Router.go(location.pathname);
	},
	go: (path, addToHistory = true) => {
		console.log(`Going to ${path}`);

		if (addToHistory) {
			history.pushState({ path }, null, path);
		}
		let pageElement = null;
		switch (path) {
			case "/":
				pageElement = document.createElement("menu-page");
				break;
			case "/order":
				pageElement = document.createElement("order-page");
				break;
			default:
				if (path.startsWith("/product-")) {
					pageElement = document.createElement("details-page");
					const paramId = path.substring(path.lastIndexOf("-") + 1);
					pageElement.dataset.productId = paramId;
				}
		}
		if (pageElement) {
			const cache = document.querySelector("main");
			// cache.children[0].remove();
			cache.innerHTML = "";
			cache.appendChild(pageElement);
			// When working with long pages, this brings the user to the top when changes occured.
			window.scrollX = 0;
			window.scrollY = 0;
		}
	},
};

export default Router;
