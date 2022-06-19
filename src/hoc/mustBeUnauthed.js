import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../Firebase'

const mustBeUnauthed = Component => {
  const Unauthed = props => {
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
      if (!auth.currentUser) {
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
      setLoading(false)

      console.log(auth.currentUser)
    }, [])

    const router = useRouter()

    if (loading) {
      return <>Loading...</>
    }

    if (!loading) {
      if (isAuthenticated) {
        router.replace('/')
      } else {
        return <Component {...props} />
      }
    }

    return null
  }

  if (Component.getInitialProps) {
    Unauthed.getInitialProps = Component.getInitialProps
  }

  return Unauthed
}

export default mustBeUnauthed
