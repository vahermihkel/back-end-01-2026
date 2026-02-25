import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Product } from "../models/Product";

function ProductDetail() {
  // <Route path="/product/:product_id" element={ <ProductDetail /> } />
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

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/products/" + product_id)
      .then(res => res.json())
      .then(json => setProduct(json))
  }, [product_id]);

  return (
    <div>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.description}</div>
      <div>{product.category?.name}</div>
      <div>{product.active ? <span>Toode on aktiivne</span> : <span>Toode on mitteaktiivne</span>}</div>
    </div>
  )
}

export default ProductDetail