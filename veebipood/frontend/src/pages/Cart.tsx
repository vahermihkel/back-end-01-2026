import { useContext, useEffect, useRef, useState } from "react"
import { OrderRow } from "../models/OrderRow";
import { determineIfDisabled } from "../util/validations";
import styles from "../css/Cart.module.css"
import { CartProductId } from "../models/CartProductId";
import { CartProduct } from "../models/CartProduct";
import ParcelMachines from "../components/ParcelMachines";
import { CartSumContext } from "../context/CartSumContext";
import { calculateCartSum, getProducts } from "../util/calculations";
import { Client } from "@stomp/stompjs";

function Cart() {
  const cartLS: CartProductId[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedPM, setSelectedPM] = useState("");
  const [loading, setLoading] = useState(true);
  const {decrease, increase, empty} = useContext(CartSumContext);
  const stompClient = useRef<Client | null>(null);
  
  useEffect(() => {
    stompClient.current = new Client({
      brokerURL: 'ws://localhost:8080/ws'
    });

    stompClient.current?.activate();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const getDbProducts = async() => {
    const cartWithProducts = await getProducts(cartLS);
    setCart(cartWithProducts);
    setLoading(false);
  }

  useEffect(() => {
    getDbProducts();
  }, []);

  const emptyCart = () => {
    setCart([]); // HTML uuenduseks
    localStorage.setItem("cart", "[]"); // LS uuenduseks
    empty();
  }

  const deleteFromCart = (index: number) => {
    if (cart[index].quantity > 0) {
      decrease(cart[index].product.price * cart[index].quantity);
    }
    cart.splice(index,1); // HTMLs kustutama
    cartLS.splice(index,1); // LocalStorage-st kustutama
    setCart(cart.slice()); // HTMLi updaten
    // setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(cartLS)); // LS-t updaten
  }

  const decreaseQuantity = (index: number) => {
    decrease(cart[index].product.price);
    cart[index].quantity--;
    cartLS[index].quantity--;
    if (cart[index].quantity === 0) {
      deleteFromCart(index);
      return;
    }
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cartLS));
  }

  const increaseQuantity = (index: number) => {
    increase(cart[index].product.price);
    cart[index].quantity++;
    cartLS[index].quantity++;
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cartLS));
  }

  const order = () => {
    if (selectedPM === "") {
      alert("Pead valima pakiautomaadi!");
      return;
    } 
    const orderRows: OrderRow[] = cart.map(cartProduct => 
      ({productId: Number(cartProduct.product.id), quantity: cartProduct.quantity})
    );
    fetch(import.meta.env.VITE_BACKEND_URL + "/orders?parcelMachine=" + selectedPM, {
      method: "POST",
      body: JSON.stringify(orderRows),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }).then(res => res.json())
    .then(json => {
      if (json.message && json.timestamp && json.status) {
        alert(json.message);
      } else {
        sendUpdatedStocks(json.link);
        // window.location.href = json.link;
      }
    })
  }

  const sendUpdatedStocks = (link: string): void => {
      if (stompClient.current) {
        stompClient.current.publish({
          destination: "/app/stock"
        });
      }
      window.location.href = link;
    };

  if (loading) {
    return <div></div>
  }

  if (cart.length === 0) {
    return <div>Ostukorv on tühi</div>
  }

  return (
    <div>
      <div>Valitud PM: {selectedPM}</div>
      <button onClick={emptyCart}>Empty</button>
      <div className={styles.products}>
        {cart.map((cp, index) =>
          <div key={cp.product.id} className={styles.product}>
            <div className={styles.name}>{cp.product.name}</div>
            <div className={styles.price}>{cp.product.price}€</div>
            <button onClick={() => decreaseQuantity(index)}>-</button>
            <div className={styles.quantity}>{cp.quantity}tk</div>
            <button disabled={determineIfDisabled(cartLS, Number(cp.product.id), cp.product.stock)} onClick={() => increaseQuantity(index)}>+</button>
            <div className={styles.total}>{cp.product.price * cp.quantity}€</div>
            <button onClick={() => deleteFromCart(index)}>x</button>
          </div>
        )}
      </div>

      <ParcelMachines setPM={setSelectedPM} />

      <div>Kogusumma: {calculateCartSum(cart)} €</div>
      {calculateCartSum(cart) < 7000 ? 
        <button onClick={() => order()}>Telli</button> :
        <div>Ei saa nii suure summa eest tellida!</div>
        }
      {/* <button onClick={order}>Telli</button> */}
    </div>
  )
}

export default Cart