export interface Produto {
  id: number
  nome: string
  preco: string
  descricao: string
  fotos: Array<{ src: string; titulo: string }>
  vendido: string
  usuario_id: number
}
