import { useEffect, useState } from "react";

function ParcelMachines(props: {setPM: (pm: string) => void}) {
  const [parcelmachines, setParcelMachines] = useState<any[]>([]);
  const [country, setCountry] = useState("EE");

  const getParcelMachines = async() => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/parcelmachines?country=" + country);
    const json = await res.json();
    setParcelMachines(json);
  }

  useEffect(() => {
    getParcelMachines();
  }, [country]);

  return (
    <div>
      <button onClick={() => setCountry("EE")}>Eesti</button>
      <button onClick={() => setCountry("LV")}>Läti</button>
      <button onClick={() => setCountry("LT")}>Leedu</button>
      <select onChange={(e) => props.setPM(e.target.value)}>
        {parcelmachines.map(pm => 
          <option key={pm.NAME}>{pm.NAME}</option>
        )}
      </select>
    </div>
  )
}

export default ParcelMachines