import { CartProductId } from "../models/CartProductId";

export const determineIfDisabled = (cart: CartProductId[], productId: number, stock: number) => {
    if (stock === 0) {
      return true;
    }
    const productInCart = cart.find(cartProduct => cartProduct.productId === productId);
    if (productInCart === undefined) {
      return false;
    }
    return productInCart.quantity >= stock;
  }