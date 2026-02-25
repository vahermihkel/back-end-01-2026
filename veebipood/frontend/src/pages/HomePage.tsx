import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import type { Product } from '../models/Product';
import type { Category } from '../models/Category';
import { determineIfDisabled } from '../util/validations';
import styles from "../css/HomePage.module.css"
import { CartProductId } from '../models/CartProductId';
import { CartSumContext } from '../context/CartSumContext';
import { Client, IFrame, IMessage } from '@stomp/stompjs';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const [sort, setSort] = useState("id,asc");
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cart, setCart] = useState<CartProductId[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const {increase} = useContext(CartSumContext);
  // const [isConnected, setIsConnected] = useState<boolean>(false);
    
  // Type the ref as Client or null
  const stompClient = useRef<Client | null>(null);
  const sortRef = useRef(sort);
  const sizeRef = useRef(size);
  const pageRef = useRef(page);

  // WebSocketi tõttu peame uuendama, et oleks sama sort ja sama lehekülg ja sama size mis
  //   enne seda kui back-endist tulevad WebSocketist uued tooted (back-endis me ei tea
  //          mitmendal lehel ja mis sortiga oleme)
  useEffect(() => {
    sortRef.current = sort;
    sizeRef.current = size;
    pageRef.current = page;
  }, [sort, size, page]);
  
    useEffect(() => {
      stompClient.current = new Client({
        brokerURL: import.meta.env.VITE_SOCKET_URL,
        onConnect: (frame: IFrame) => {
          // setIsConnected(true);
          console.log('Connected: ' + frame);
          
          stompClient.current?.subscribe('/topic/products', (message: IMessage) => {
            let updatedProducts: Product[] = JSON.parse(message.body);
            console.log(sortRef.current);
            switch(sortRef.current) {
              case "id,asc": updatedProducts.sort((a,b) => Number(a.id) - Number(b.id)); break;
              case "id,desc": updatedProducts.sort((a,b) => Number(a.id) - Number(b.id)); break;
              case "name,asc": updatedProducts.sort((a,b) => a.name.localeCompare(b.name)); break;
              case "name,desc": updatedProducts.sort((a,b) => b.name.localeCompare(a.name)); break;
              case "price,asc": updatedProducts.sort((a,b) => a.price - b.price); break;
              case "price,desc": updatedProducts.sort((a,b) => b.price - a.price); break;
            }
            // 0: 0,4
            // 1: 4,8
            // 2: 8,12
            updatedProducts = updatedProducts.slice(
              pageRef.current*sizeRef.current,
              (pageRef.current+1)*sizeRef.current
            );
            console.log(updatedProducts);
            setProducts(updatedProducts);
            // setGreetings((prev) => [...prev, body.content]);
          });
        },
        onWebSocketError: (error: Event) => {
          console.error('Error with websocket', error);
        },
        onStompError: (frame: IFrame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        },
      });

      stompClient.current?.activate();
  
      return () => {
        if (stompClient.current) {
          stompClient.current.deactivate();
        }
      };
    }, []);

  useEffect(() => {
    let url = import.meta.env.VITE_BACKEND_URL + `/products?page=${page}&size=${size}&sort=${sort}`;
    if (categoryId > 0) {
      url += "&categoryId=" + categoryId;
    }
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setProducts(json.content);
        setTotalElements(json.totalElements);
        setTotalPages(json.totalPages);
        setLoading(false);
      })
  }, [categoryId, page, size, sort]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  const handleSize = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  }

  const handleSort = (newSort: string) => {
    setSort(newSort);
    setPage(0);
  }

  const addToCart = (clickedProduct: Product) => {
    // const cart: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]") ;
    const found = cart.find(cartProduct => cartProduct.productId === clickedProduct.id);
    if (found) {
      found.quantity++;
    } else {
      cart.push({productId: Number(clickedProduct.id), quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart.slice());
    increase(clickedProduct.price);
  }

  // array localStorage-sse:
  // 1. võtta localStoragest vana seis (.getItem())
  // 1b. kui on tühi, siis võta tühi array
  // 2. võtta jutumärgid maha (JSON.parse())
  // 3. lisada üks element juurde (.push())
  // 4. lisada jutumärgid tagasi (JSON.stringify())
  // 5. lisada localStorage-sse tagasi (.setItem())

  // parem klõps -> inspect -> application -> Local Storage

  if (loading) {
    return <div></div>
  }

  return (
    <div>
      <div>Kokku tooteid: {totalElements}</div>
      <br /><br />
      <button onClick={() => setCategoryId(0)}>Kõik kategooriad</button>
      {categories.map(category => 
        <button key={category.id} onClick={() => setCategoryId(Number(category.id))}>
          {category.name}
        </button>)
      }
      <br /><br />
      <select defaultValue="2" onChange={(e) => handleSize(Number(e.target.value))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>

      <br /><br />

      <button className={sort === "name,asc" ? "sort-active" : undefined} onClick={() => handleSort("name,asc")}>Sorteeri A-Z</button>
      <button className={sort === "name,desc" ? "sort-active" : undefined} onClick={() => handleSort("name,desc")}>Sorteeri Z-A</button>
      <button className={sort === "price,asc" ? "sort-active" : undefined} onClick={() => handleSort("price,asc")}>Sorteeri hind kasvavalt</button>
      <button className={sort === "price,desc" ? "sort-active" : undefined} onClick={() => handleSort("price,desc")}>Sorteeri hind kahanevalt</button>
      <button className={sort === "id,asc" ? "sort-active" : undefined} onClick={() => handleSort("id,asc")}>Sorteeri vanemad ees</button>
      <button className={sort === "id,desc" ? "sort-active" : undefined} onClick={() => handleSort("id,desc")}>Sorteeri uuemad ees</button>

      <div className={styles.products}>
        {products.map(p => 
        <div key={p.id}>
          <div>{p.name}</div>
          <div>{p.price}€</div>
          <div>{p.stock}tk</div>
          <Link to={"/product/" + p.id}>
            <button>Vt lähemalt</button>
          </Link>
          <button disabled={determineIfDisabled(cart, Number(p.id), p.stock)} onClick={() => addToCart(p)}>Lisa ostukorvi</button>
        </div>)}
      </div>
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine</button>
      <span>{page + 1} / {totalPages}</span>
      <button disabled={page+1 >= totalPages} onClick={() => setPage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default HomePage