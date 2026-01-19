import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function HomePage() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    let url = "http://localhost:8080/products";
    if (categoryId > 0) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(res => res.json())
      .then(json => setProducts(json))
  }, [categoryId]);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  return (
    <div>
      <button disabled={count === 0} onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <br /><br />
      <button onClick={() => setCategoryId(0)}>Kõik kategooriad</button>
      {categories.map(category => 
        <button key={category.id} onClick={() => setCategoryId(category.id)}>
          {category.name}
        </button>)
      }

      {products.map(p => 
        <div key={p.id}>
          {p.name}
          <Link to={"/product/" + p.id}>
            <button>Vt lähemalt</button>
          </Link>
        </div>)}
    </div>
  )
}

export default HomePage