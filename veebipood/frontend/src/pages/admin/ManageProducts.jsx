import { useEffect, useState } from "react"

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => setProducts(json))
  }, []);

  function deleteProduct(productId) {
     fetch("http://localhost:8080/products/" + productId, {
      method: "DELETE"
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
              <td><button onClick={() => deleteProduct(product.id)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageProducts