import type { Produto } from "./Produto"

export interface Sale {
  produto: Produto
  comprador_id: string
  endereco?: {
    [key: string]: string
  }
}
