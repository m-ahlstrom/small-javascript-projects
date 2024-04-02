import API from "./API.js";

const Store = {
	menu: null,
	cart: [],
};

const proxiedStore = new Proxy(Store, {
	set(target, property, value) {
		target[property] = value;
		if (property == "menu") {
			// We should use window, because the app has more documents.
			window.dispatchEvent(new Event("appmenuchange"));
		}
		if (property == "cart") {
			window.dispatchEvent(new Event("appcartchange"));
		}
		return true;
	},
});

export default proxiedStore;
