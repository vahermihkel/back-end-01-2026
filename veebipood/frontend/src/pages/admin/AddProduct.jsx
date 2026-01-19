import { useEffect, useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    active: false,
    category: {
      id: 0
    }
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
     fetch("http://localhost:8080/categories")
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
    fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
     })
      .then(res => res.json())
      .then(() => setProduct({
        name: "",
        price: 0,
        description: "",
        active: false,
        category: {
          id: 0
        }
        }))
      }

  return (
    <div>
      <div>Ajutine väljakuvamine: {JSON.stringify(product)}</div>
      <label>Toote nimi</label> <br />
      <input value={product.name} onChange={(e) => setProduct({...product,"name": e.target.value})} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input value={product.price} onChange={(e) => setProduct({...product,"price": e.target.value})} type="text" /> <br />
      <label>Toote kirjeldus</label> <br />
      <input value={product.description} onChange={(e) => setProduct({...product,"description": e.target.value})} type="text" /> <br />
      <label>Toote aktiivsus</label> <br />
      <input value={product.active} onChange={(e) => setProduct({...product,"active": e.target.checked})} type="checkbox" /> <br />
      <label>Toote kategooria</label> <br />
      <select value={product.category?.id} onChange={(e) => setProduct({...product,"category": {"id": e.target.value}})}>
        <option disabled value="0">Vali kategooria!</option>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select> <br />
      <button onClick={() => addProduct()}>Sisesta</button> <br />
    </div>
  )
}

export default AddProduct