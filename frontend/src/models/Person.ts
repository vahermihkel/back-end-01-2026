import { Address } from "./Address"

export type Person = {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  role: "CUSTOMER" | "ADMIN" | "SUPERADMIN",
  address?: Address
}