import { Link } from "react-router-dom"

function AdminHome() {
  return (
    <div>
      <Link to="/admin/add-product">
        <button>Lisa toode</button>
      </Link>

      <Link to="/admin/manage-products">
        <button>Halda tooteid</button>
      </Link>

      <Link to="/admin/manage-categories">
        <button>Halda kategooriaid</button>
      </Link>
    </div>
  )
}

export default AdminHome