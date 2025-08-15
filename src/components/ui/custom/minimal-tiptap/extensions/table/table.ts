import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'

export const TableExtension = Table.configure({
  resizable: true,
  HTMLAttributes: {
    class: 'table-node',
  },
})

export const TableRowExtension = TableRow.configure({
  HTMLAttributes: {
    class: 'table-row-node',
  },
})

export const TableCellExtension = TableCell.configure({
  HTMLAttributes: {
    class: 'table-cell-node',
  },
})

export const TableHeaderExtension = TableHeader.configure({
  HTMLAttributes: {
    class: 'table-header-node',
  },
})

export const TableExtensions = [
  TableExtension,
  TableRowExtension,
  TableCellExtension,
  TableHeaderExtension,
] 