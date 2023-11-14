import { useEffect } from 'react'

const useTitle = (title: string = '兰亭') => {
  useEffect(() => {
    document.title = title

    return () => { document.title = '兰亭' }
  }, [title])
}

export default useTitle