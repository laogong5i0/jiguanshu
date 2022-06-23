import React from 'react'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { TreeNode, ITreeNode } from '@designable/core'
import { MonacoInput } from '@designable/react-settings-form'
import { rootType } from './PreviewWidget'

export interface ISchemaEditorWidgetProps {
  type: rootType
  tree: TreeNode
  onChange?: (tree: ITreeNode) => void
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = ({
  type,
  ...props
}) => {
  return (
    <MonacoInput
      {...props}
      value={JSON.stringify(
        transformToSchema(props.tree, { designableFormName: type }),
        null,
        2
      )}
      onChange={(value) => {
        props.onChange?.(
          transformToTreeNode(JSON.parse(value), { designableFormName: type })
        )
      }}
      language="json"
    />
  )
}
