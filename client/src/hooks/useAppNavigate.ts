import { flushSync } from 'react-dom'
import { type NavigateOptions, useNavigate, useLocation } from 'react-router-dom'

interface NavigateOptionsProps extends NavigateOptions {
  previousPath?: string
}

export const useAppNavigate = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const _navigate = (path: any, options?: NavigateOptionsProps) => {
    if (!document.startViewTransition) {
      navigate(path, {
        ...options,
        state: {
          previousPath: pathname,
          ...options?.state
        }
      })
    } else {
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(path, {
            ...options,
            state: {
              previousPath: pathname,
              ...options?.state
            }
          })
        })
      })
    }
  }

  return {
    navigate: _navigate
  }
}
