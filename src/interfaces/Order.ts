import type { Product } from "./Product"

export interface Order {
  produto: Product
  vendedor_id: string
}
