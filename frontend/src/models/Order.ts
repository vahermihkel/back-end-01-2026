import type { OrderRow } from "./OrderRow"

export type Order = {
  id: number,
  created: Date,
  total: number,
  person: any,
  parcelMachine: string,
  paymentState: string,
  orderRows: OrderRow[]
}