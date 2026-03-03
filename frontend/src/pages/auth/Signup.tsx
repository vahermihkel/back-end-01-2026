import { useState } from "react"
import { Person } from "../../models/Person";
import { useNavigate } from "react-router-dom";
import { Role } from "../../models/Role";

function Signup() {
  const [person, setPerson] = useState<Person>({
    firstName: "",
    lastName: "",
    email: "",
    role: "CUSTOMER"
  });
  const navigate = useNavigate();

  const signup = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json"
      }
     });
    const json = await res.json();
    if (json.id) {
      navigate("/login");
    }
  }

  return (
    <div>
      <label>First name</label> <br />
      <input value={person.firstName} onChange={(e) => setPerson({...person, firstName: e.target.value})} type="text" /> <br />
      <label>Last name</label> <br />
      <input value={person.lastName} onChange={(e) => setPerson({...person, lastName: e.target.value})} type="text" /> <br />
      <label>Email</label> <br />
      <input value={person.email} onChange={(e) => setPerson({...person, email: e.target.value})} type="text" /> <br />
      <label>Password</label> <br />
      <input value={person.password} onChange={(e) => setPerson({...person, password: e.target.value})} type="password" /> <br />
      <label>Role (for testing purposes)</label> <br />
      <select onChange={(e) => setPerson({...person, role: e.target.value.toUpperCase() as Role})}>
        <option>Customer</option>
        <option>Admin</option>
        <option>Superadmin</option>
      </select> <br />
      <button onClick={signup}>Sign up</button>
    </div>
  )
}

export default Signup