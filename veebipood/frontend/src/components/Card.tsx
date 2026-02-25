import { ReactNode } from "react"

// rfce
function Card({children}: {children: ReactNode}) {
  return (
    <div>
      <h1>See on kaart</h1>
      {children}
      <button>Saad vajutada</button>
    </div>
  )
}

export default Card