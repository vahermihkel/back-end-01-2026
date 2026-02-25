import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const {login} = useContext(AuthContext);
  const [loginCredentials, setLoginCredentials] = useState({"email": "", "password": ""});

  const handleLogin = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      headers: {
        "Content-Type": "application/json"
      }
     });
    const json = await res.json();
    console.log(json);
    if (json.message && json.status && json.timestamp) {
      alert(json.message);
      return;
    }
    login(json.token);
  }

  return (
    <div>
      <label>Email</label> <br />
      <input onChange={(e) => setLoginCredentials({...loginCredentials, email: e.target.value})} type="text" /> <br />
      <label>Password</label> <br />
      <input onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})} type="password" /> <br />
      <button onClick={handleLogin}>Log in</button>
    </div>
  )
}

export default Login