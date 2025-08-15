import * as React from "react"
import type { Editor } from "@tiptap/react"
import type { FormatAction } from "../../types"
import type { toggleVariants } from "@/components/ui/toggle"
import type { VariantProps } from "class-variance-authority"
import {
  CaretDownIcon,
  TableIcon,
  PlusIcon,
  MinusIcon,
} from "@radix-ui/react-icons"
import { ToolbarSection } from "../toolbar-section"

type TableAction = "insertTable" | "addColumnBefore" | "addColumnAfter" | "deleteColumn" | "addRowBefore" | "addRowAfter" | "deleteRow" | "deleteTable"

interface TableElement extends FormatAction {
  value: TableAction
}

const tableActions: TableElement[] = [
  {
    value: "insertTable",
    label: "Insert table",
    icon: <TableIcon className="size-5" />,
    action: (editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    shortcuts: ["mod", "shift", "T"],
  },
  {
    value: "addColumnBefore",
    label: "Add column before",
    icon: <PlusIcon className="size-5" />,
    action: (editor) => editor.chain().focus().addColumnBefore().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().addColumnBefore().run(),
    shortcuts: [],
  },
  {
    value: "addColumnAfter",
    label: "Add column after",
    icon: <PlusIcon className="size-5" />,
    action: (editor) => editor.chain().focus().addColumnAfter().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().addColumnAfter().run(),
    shortcuts: [],
  },
  {
    value: "deleteColumn",
    label: "Delete column",
    icon: <MinusIcon className="size-5" />,
    action: (editor) => editor.chain().focus().deleteColumn().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().deleteColumn().run(),
    shortcuts: [],
  },
  {
    value: "addRowBefore",
    label: "Add row before",
    icon: <PlusIcon className="size-5" />,
    action: (editor) => editor.chain().focus().addRowBefore().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().addRowBefore().run(),
    shortcuts: [],
  },
  {
    value: "addRowAfter",
    label: "Add row after",
    icon: <PlusIcon className="size-5" />,
    action: (editor) => editor.chain().focus().addRowAfter().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().addRowAfter().run(),
    shortcuts: [],
  },
  {
    value: "deleteRow",
    label: "Delete row",
    icon: <MinusIcon className="size-5" />,
    action: (editor) => editor.chain().focus().deleteRow().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().deleteRow().run(),
    shortcuts: [],
  },
  {
    value: "deleteTable",
    label: "Delete table",
    icon: <MinusIcon className="size-5" />,
    action: (editor) => editor.chain().focus().deleteTable().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().deleteTable().run(),
    shortcuts: [],
  },
]

interface SectionTableProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeActions?: TableAction[]
  mainActionCount?: number
}

export const SectionTable: React.FC<SectionTableProps> = ({
  editor,
  activeActions = tableActions.map((action) => action.value),
  mainActionCount = 1,
  size,
  variant,
}) => {
  return (
    <ToolbarSection
      editor={editor}
      actions={tableActions}
      activeActions={activeActions}
      mainActionCount={mainActionCount}
      dropdownIcon={
        <>
          <TableIcon className="size-5" />
          <CaretDownIcon className="size-5" />
        </>
      }
      dropdownTooltip="Table actions"
      size={size}
      variant={variant}
    />
  )
}

SectionTable.displayName = "SectionTable"

export default SectionTable 