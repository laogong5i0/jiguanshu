import React from 'react'
import { Form as FormType, IFormFeedback } from '@formily/core'
import { useForm, FormProvider, JSXComponent } from '@formily/react'
import { Layout, ILayoutProps } from '../layout'
import { PreviewText } from '@formily/antd'
export interface FormProps extends ILayoutProps {
  form?: FormType
  component?: JSXComponent
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  previewTextPlaceholder?: React.ReactNode
}

export const Page: React.FC<FormProps> = ({
  form,
  component,
  onAutoSubmit,
  onAutoSubmitFailed,
  previewTextPlaceholder,
  ...props
}) => {
  const top = useForm()
  const renderContent = (form: FormType) => (
    <PreviewText.Placeholder value={previewTextPlaceholder}>
      <Layout {...props}>
        {React.createElement(
          component,
          {
            onSubmit(e: React.FormEvent) {
              e?.stopPropagation?.()
              e?.preventDefault?.()
              form.submit(onAutoSubmit).catch(onAutoSubmitFailed)
            },
          },
          props.children
        )}
      </Layout>
    </PreviewText.Placeholder>
  )
  if (form)
    return <FormProvider form={form}>{renderContent(form)}</FormProvider>
  if (!top) throw new Error('must pass form instance by createForm')
  return renderContent(top)
}

Page.defaultProps = {
  component: 'div',
}

export default Page
