import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Product } from "../../models/Product";

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/products/admin", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setProducts(json))
  }, []);

  function deleteProduct(productId: number) {
     fetch(import.meta.env.VITE_BACKEND_URL + "/products/" + productId, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
     })
      .then(res => res.json())
      .then(json => setProducts(json))
  }

  // const deleteProduct = () => {
  // }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Active</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product =>
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category.name}</td>
              <td>{product.active ? "Aktiivne": "Mitteaktiivne"}</td>
              <td><button onClick={() => deleteProduct(Number(product.id))}>Delete</button></td>
              <td>
                <Link to={"/admin/edit-product/" + product.id}>
                  <button>Muuda</button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageProducts