import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import english from "../assets/english.png";
import estonian from "../assets/estonian.png";
import { useContext } from "react";
import { CartSumContext } from "../context/CartSumContext";
import { AuthContext } from "../context/AuthContext";

function Menu() {
  const { t, i18n } = useTranslation();
  const {cartSum} = useContext(CartSumContext);
  const {person, isLoggedIn, logout} = useContext(AuthContext);

  const handleChangeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }

  const logoutHandler = () => {
    // sessionStorage.removeItem("token");
    // navigate("/");
    logout();
  }

  return (
    <div>
      <Link to="/">
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLlkxgdLp76ldIsyG8FypoAU2K5URuCr5p-A&s" alt="" />
      </Link>

      <Link to="/cart">
        <button>{t("menu.cart")}</button>
      </Link>

      <Link to="/websocket">
        <button>Websocket</button>
      </Link>

      {isLoggedIn ?
        <>
          {(person.role === "ADMIN" || person.role === "SUPERADMIN") &&
          <Link to="/admin">
            <button>Admin</button>
          </Link>}

          <Link to="/profile">
            <button>{t("menu.profile")}</button>
          </Link>

          <Link to="/my-orders">
            <button>{t("menu.my-orders")}</button>
          </Link>

          <span>Hi, {person.firstName}</span>

          <button onClick={logoutHandler}>Log out</button>
        </> :
        <>
          <Link to="/login">
            <button>{t("menu.login")}</button>
          </Link>

          <Link to="/signup">
            <button>{t("menu.signup")}</button>
          </Link>
        </>  
      }
    
      <span>{cartSum}€</span>

      <img className="icon" onClick={() => handleChangeLanguage("en")} src={english} alt="" />
      <img className="icon" onClick={() => handleChangeLanguage("et")} src={estonian} alt="" />
    </div>
  )
}

export default Menu