import { useEffect, useState } from "react"
import { Category } from "../../models/Category";

function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({
    "name": ""
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  function deleteCategory(categoryId: number) {
     fetch(import.meta.env.VITE_BACKEND_URL + "/categories/" + categoryId, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
     })
      .then(res => res.json())
      .then(json => setCategories(json))
  }

  function addCategory() {
    if (!category.name) {
      alert("Tühja nimega ei saa kategooriat lisada!");
      return;
    } 
    fetch(import.meta.env.VITE_BACKEND_URL + "/categories", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
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
              <td><button onClick={() => deleteCategory(Number(category.id))}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageCategories