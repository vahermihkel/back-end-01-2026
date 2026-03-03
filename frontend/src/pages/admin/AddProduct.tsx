import { useEffect, useState } from "react";
import type { Category } from "../../models/Category";
import { Product } from "../../models/Product";

function AddProduct() {
  const emptyProduct = {
    name: "",
    price: 0,
    description: "",
    active: false,
    category: {
      id: 0,
      name: ""
    },
    image: "",
    stock: 0
  }

  const [product, setProduct] = useState<Product>(emptyProduct);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
     fetch(import.meta.env.VITE_BACKEND_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  function addProduct() {
    if (!product.name) {
      alert("Tühja nimega ei saa toodet lisada!");
      return;
    } 
    if (product.price <= 0) {
      alert("Null või miinushinnaga ei saa toodet lisada!");
      return;
    } 
    if (product.category.id === 0) {
      alert("Peab lisama kategooria!");
      return;
    } 
    fetch(import.meta.env.VITE_BACKEND_URL + "/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
     })
      .then(res => res.json())
      .then(() => setProduct(emptyProduct))
      }

  return (
    <div>
      <div>Ajutine väljakuvamine: {JSON.stringify(product)}</div>
      <label>Toote nimi</label> <br />
      <input value={product.name} onChange={(e) => setProduct({...product,"name": e.target.value})} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input value={product.price} onChange={(e) => setProduct({...product,"price": Number(e.target.value)})} type="number" /> <br />
      <label>Toote kirjeldus</label> <br />
      <input value={product.description} onChange={(e) => setProduct({...product,"description": e.target.value})} type="text" /> <br />
      <label>Toote kogus</label> <br />
      <input value={product.stock} onChange={(e) => setProduct({...product,"stock": Number(e.target.value)})} type="number" /> <br />
      <label>Toote aktiivsus</label> <br />
      <input checked={product.active} onChange={(e) => setProduct({...product,"active": e.target.checked})} type="checkbox" /> <br />
      <label>Toote kategooria</label> <br />
      <select value={product.category?.id} onChange={(e) => setProduct({...product,"category": {"id": Number(e.target.value), "name": ""}})}>
        <option disabled value="0">Vali kategooria!</option>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select> <br />
      <button onClick={() => addProduct()}>Sisesta</button> <br />
    </div>
  )
}

export default AddProduct