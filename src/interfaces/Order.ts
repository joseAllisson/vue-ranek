import type { Produto } from "./Produto"

export interface Order {
  produto: Produto
  vendedor_id: string
}
