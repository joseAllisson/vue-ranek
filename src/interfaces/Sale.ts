import type { Product } from "./Product"

export interface Sale {
  produto: Product
  comprador_id: string
  endereco?: {
    [key: string]: string
  }
}
