import React, { createContext, useContext } from 'react'
import { useResponsiveLayout } from './useResponsiveLayout'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'

export interface ILayoutProps {
  title?: string
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  colon?: boolean
  labelAlign?: 'right' | 'left' | ('right' | 'left')[]
  wrapperAlign?: 'right' | 'left' | ('right' | 'left')[]
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
  labelCol?: number | number[]
  wrapperCol?: number | number[]
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?:
    | 'vertical'
    | 'horizontal'
    | 'inline'
    | ('vertical' | 'horizontal' | 'inline')[]
  direction?: 'rtl' | 'ltr'
  inset?: boolean
  shallow?: boolean
  tooltipLayout?: 'icon' | 'text'
  tooltipIcon?: React.ReactNode
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none'
  bordered?: boolean
  breakpoints?: number[]
  spaceGap?: number
  gridColumnGap?: number
  gridRowGap?: number
}

export interface ILayoutContext
  extends Omit<
    ILayoutProps,
    'labelAlign' | 'wrapperAlign' | ' ' | 'labelCol' | 'wrapperCol'
  > {
  labelAlign?: 'right' | 'left'
  wrapperAlign?: 'right' | 'left'
  layout?: 'vertical' | 'horizontal' | 'inline'
  labelCol?: number
  wrapperCol?: number
}

export const LayoutDeepContext = createContext<ILayoutContext>(null)

export const LayoutShallowContext = createContext<ILayoutContext>(null)

export const useDeepLayout = () => useContext(LayoutDeepContext)

export const useShallowLayout = () => useContext(LayoutShallowContext)

export const useLayout = () => ({
  ...useDeepLayout(),
  ...useShallowLayout(),
})

export const Layout: React.FC<ILayoutProps> & {
  useLayout: () => ILayoutContext
  useDeepLayout: () => ILayoutContext
  useShallowLayout: () => ILayoutContext
} = ({ shallow, children, prefixCls, className, style, ...otherProps }) => {
  const { ref, props } = useResponsiveLayout(otherProps)
  const deepLayout = useDeepLayout()
  const formPrefixCls = usePrefixCls('form', { prefixCls })
  const layoutPrefixCls = usePrefixCls('formily-layout', { prefixCls })
  const layoutClassName = cls(
    layoutPrefixCls,
    {
      [`${formPrefixCls}-${props.layout}`]: true,
      [`${formPrefixCls}-rtl`]: props.direction === 'rtl',
      [`${formPrefixCls}-${props.size}`]: props.size,
    },
    className
  )
  const renderChildren = () => {
    const newDeepLayout = {
      ...deepLayout,
    }
    if (!shallow) {
      Object.assign(newDeepLayout, props)
    } else {
      if (props.size) {
        newDeepLayout.size = props.size
      }
      if (props.colon) {
        newDeepLayout.colon = props.colon
      }
    }
    return (
      <LayoutDeepContext.Provider value={newDeepLayout}>
        <LayoutShallowContext.Provider value={shallow ? props : undefined}>
          {children}
        </LayoutShallowContext.Provider>
      </LayoutDeepContext.Provider>
    )
  }
  return (
    <div ref={ref} className={layoutClassName} style={style}>
      {renderChildren()}
    </div>
  )
}

Layout.defaultProps = {
  shallow: true,
}

Layout.useDeepLayout = useDeepLayout
Layout.useShallowLayout = useShallowLayout
Layout.useLayout = useLayout

export default Layout
