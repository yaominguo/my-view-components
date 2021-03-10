export default function useDOMCreate(nodeId: string): void {
  const existNode = document.querySelector(`#${nodeId}`)
  if (!existNode) {
    const node = document.createElement('div')
    node.id = nodeId
    document.body.appendChild(node)
  }
}
