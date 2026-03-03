import { useContext, useEffect, useState } from "react";
import { Person } from "../../models/Person";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const [person, setPerson] = useState<Person>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "CUSTOMER"
  });

  const {person: dbPerson, setPerson: setDbPerson} = useContext(AuthContext);

  useEffect(() => {
    setPerson(dbPerson);
  }, [dbPerson]);
  
  // useEffect(() => {
  //   const getPerson = async() => {
  //     const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/profile", {
  //       headers: {
  //         "Authorization": "Bearer " + sessionStorage.getItem("token")
  //       }
  //     });
  //     const json = await res.json();
  //     setPerson(json);
  //   }
  //   getPerson();
  // }, []);

  const updateProfile = async() => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/update-profile", {
        method: "PUT",
        body: JSON.stringify(person),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
      });
      const json = await res.json();
      setPerson(json);
      setDbPerson(json);
  }

  if (person.email === "") {
    return <></>
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
      <button onClick={updateProfile}>Update profile</button>
    </div>
  )
}

export default Profile