import React, { useMemo } from 'react'
import { createBehavior, createResource } from '@designable/core'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import { Page as FormilyForm } from '@designable/page'
import { usePrefix, DnFC } from '@designable/react'
// import { AllSchemas } from '../../schemas'
import { createPageSchema } from '../Field'
import { AllLocales } from '../../locales'
import './styles.less'

export const Page: DnFC<React.ComponentProps<typeof FormilyForm>> = observer(
  (props) => {
    const prefix = usePrefix('designable-form')
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <FormilyForm
        {...props}
        style={{ ...props.style }}
        className={prefix}
        form={form}
      >
        {props.children}
      </FormilyForm>
    )
  }
)

Page.Behavior = createBehavior({
  name: 'Page',
  selector: (node) => node.componentName === 'Page',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: createPageSchema(),
      // propsSchema: {
      //   type: 'object',
      //   properties: {
      //     ...(AllSchemas.Page.properties as any),
      //     style: AllSchemas.CSSStyle,
      //   },
      // },
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    }
  },
  designerLocales: AllLocales.Page,
})

Page.Resource = createResource({
  title: { 'zh-CN': '页面1', 'en-US': 'Page' },
  icon: 'OpenPageButtonSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Page',
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
          },
        },
      ],
    },
  ],
})
