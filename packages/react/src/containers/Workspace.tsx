import React, { useMemo, useRef, Fragment } from 'react'
import { useDesigner } from '../hooks'
import { WorkspaceContext } from '../context'
export interface IWorkspaceProps {
  id?: string
  title?: string
  description?: string
}

export const Workspace: React.FC<IWorkspaceProps> = ({
  id,
  title,
  description,
  ...props
}) => {
  const oldId = useRef<string>()
  const designer = useDesigner()
  /**
   * 当id或者designer改变时，根据id调用worbench的findWorkspaceById函
   * 数获取workspace并移除旧事件。然后再调用workbench的ensureWorkspace
   * 确保workspace存在并重新添加事件监听
   */
  const workspace = useMemo(() => {
    if (!designer) return
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current)
      if (old) old.viewport.detachEvents()
    }
    const workspace = {
      id: id || 'index',
      title,
      description,
    }
    designer.workbench.ensureWorkspace(workspace)
    oldId.current = workspace.id
    return workspace
  }, [id, designer])
  return (
    <Fragment>
      <WorkspaceContext.Provider value={workspace}>
        {props.children}
      </WorkspaceContext.Provider>
    </Fragment>
  )
}
