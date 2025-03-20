export interface Node {
  id: number
  children: Node[]
  [key: string]: any
}

export type Nodes = Node[] | readonly Node[]

export interface MultiTreeProps {
  nodes: Node[] | readonly Node[]
  labelBy: string
  onItemClick: (nodes: Node[]) => void
}
