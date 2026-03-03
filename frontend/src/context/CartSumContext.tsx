import { createContext, ReactNode, useEffect, useState } from "react";
import { CartProductId } from "../models/CartProductId";
import { calculateCartSum, getProducts } from "../util/calculations";

// loob valmis põhja ja võimaldab importida neid muutujaid
export const CartSumContext = createContext({
  cartSum: 0,
  decrease: (_amount: number) => {},
  increase: (_amount: number) => {},
  empty: () => {},
});

// annab skoobi
// kui tahan et ainult admin vaates oleksid kättesaadavad:
// <CartSumContextProvider>
//    <Admin />
// </CartSumContextProvider>

export const CartSumContextProvider = ({children}: {children: ReactNode}) => {
  const [cartSum, setCartSum] = useState(0);
  
  const getDbProducts = async() => {
    const cartLS: CartProductId[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartWithProducts = await getProducts(cartLS);
    setCartSum(calculateCartSum(cartWithProducts));
  }

  useEffect(() => {
    getDbProducts();
  }, []);

  const decrease = (amount: number) => {
    setCartSum(cartSum - amount);
  }

  const increase = (amount: number) => {
    setCartSum(cartSum + amount);
  }

  const empty = () => {
    setCartSum(0);
  }

  return (
    <CartSumContext.Provider value={{cartSum, decrease, increase, empty}}>
      {children}
    </CartSumContext.Provider>
  )
}