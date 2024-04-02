// Import web components and define custom elements.

import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

customElements.define("cart-item", CartItem);
customElements.define("product-item", ProductItem);
customElements.define("menu-page", MenuPage);
customElements.define("details-page", DetailsPage);
customElements.define("order-page", OrderPage);
