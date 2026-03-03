import { CartProduct } from "../models/CartProduct";
import { CartProductId } from "../models/CartProductId";

export const calculateCartSum = (cart: CartProduct[]) => {
  let sum = 0;
  cart.forEach(cp => sum += cp.product.price * cp.quantity);
  return sum;
}

export const getProducts = async(cartLS: CartProductId[]) => {
  const updatedCart = cartLS.map(async(cartProductId) => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/products/" + cartProductId.productId);
    const json = await res.json();
    return {quantity: cartProductId.quantity, product: json};
  })
  const resolvedCart = await Promise.all(updatedCart);
  return resolvedCart;
}