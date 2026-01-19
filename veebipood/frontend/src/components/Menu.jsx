import { Link } from "react-router-dom"

function Menu() {
  return (
    <div>
      <Link to="/">
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLlkxgdLp76ldIsyG8FypoAU2K5URuCr5p-A&s" alt="" />
      </Link>

      <Link to="/cart">
        <button>Ostukorvi</button>
      </Link>

      <Link to="/admin">
        <button>Admin</button>
      </Link>
    </div>
  )
}

export default Menu