import { getProductById } from "./Menu.js";

export async function addToCart(id) {
	const product = await getProductById(id);
	const results = app.store.cart.filter(
		(productInCart) => productInCart.id == id
	);
	if (results.length == 1) {
		// The product is already in the cart. We have to return a new array with one value changed.
		app.store.cart = app.store.cart.map((p) =>
			p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p
		);
	} else {
		// Because the proxy detects if the cart is changed, we can't just push to it. We must create a new array.
		app.store.cart = [...app.store.cart, { product, quantity: 1 }];
	}
}

export function removeFromCart(id) {
	app.store.cart = app.store.cart.filter((p) => p.product.id != id);
}
