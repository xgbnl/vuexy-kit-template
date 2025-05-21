// MUI Imports
import { styled } from '@mui/material'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import type { TreeItemProps } from '@mui/x-tree-view'

const TreeItemStyled = styled(TreeItem)<TreeItemProps>(() => ({
  '& .MuiTreeItem-content': {
    flexDirection: 'row-reverse',
    padding: '0.5rem 0.9rem',
    paddingLeft: 'calc(0.8rem + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))'
  }
}))

export default TreeItemStyled
