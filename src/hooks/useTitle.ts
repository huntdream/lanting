import { useEffect } from 'react'

const useTitle = (title: string = '') => {
  useEffect(() => {
    document.title = title

    return () => { document.title = '兰亭' }
  }, [title])
}

export default useTitle