import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Category } from "../../models/Category";
import type { Product } from "../../models/Product";

function EditProduct() {
  const {product_id} = useParams();
  const [product, setProduct] = useState<Product>({
    id: 0,
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
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
     fetch(import.meta.env.VITE_BACKEND_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/products/" + product_id)
      .then(res => res.json())
      .then(json => setProduct(json))
  }, [product_id]);

  const updateProduct = () => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/products", {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setProduct(json))
  }

  return (
    <div>
      <div>Ajutine: {JSON.stringify(product)}</div>
      <label>ID</label> <br />
      <input disabled value={product.id} type="text" /> <br />
      <label>Name</label> <br />
      <input value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} type="text" /> <br />
      <label>Price</label> <br />
      <input value={product.price} onChange={(e) => setProduct({...product, price: Number(e.target.value)})} type="number" /> <br />
      <label>Description</label> <br />
      <input value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})} type="text" /> <br />
      <label>Category</label> <br />
      <select value={product.category?.id} onChange={(e) => setProduct({...product, category: {"id": Number(e.target.value), "name": ""}})}>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select> <br />
      <label>Active</label> <br />
      <input checked={product.active} onChange={(e) => setProduct({...product, active: e.target.checked})} type="checkbox" /> <br />
      <button onClick={updateProduct}>Change</button>
    </div>
  )
}

export default EditProduct