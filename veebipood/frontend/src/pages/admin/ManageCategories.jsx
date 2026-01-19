import { useEffect, useState } from "react"

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  function deleteCategory(categoryId) {
     fetch("http://localhost:8080/categories/" + categoryId, {
      method: "DELETE"
     })
      .then(res => res.json())
      .then(json => setCategories(json))
  }

  function addCategory() {
    if (!category.name) {
      alert("Tühja nimega ei saa kategooriat lisada!");
      return;
    } 
    fetch("http://localhost:8080/categories", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json"
      }
     })
      .then(res => res.json())
      .then(json => setCategories(json))
  }

  return (
    <div>
      <div>Ajutine väljakuvamine: {JSON.stringify(category)}</div>
      <label>Kategooria</label> <br />
      <input onChange={(e) => setCategory({"name": e.target.value})} type="text" /> <br />
      <button onClick={() => addCategory()}>Sisesta</button> <br />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category =>
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td><button onClick={() => deleteCategory(category.id)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageCategories