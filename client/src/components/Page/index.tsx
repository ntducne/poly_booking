import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode,
  title: string
}

export default function Page({ children, title }: Props) {

  useEffect(() => {
    window.document.title = `${title || ''} | Hotel Fpoly`
  }, [])
  return (
    <div>
      {children}
    </div>
  )
}