import { Category } from "./Category"

export type Product = {
  id?: number,
  name: string,
  description: string,
  price: number,
  active: boolean,
  category: Category,
  image: string,
  stock: number
}