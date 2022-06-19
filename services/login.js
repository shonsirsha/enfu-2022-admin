import { auth } from '../src/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Router from 'next/router'

export default async function login(email, password) {
  try {
    const authData = await signInWithEmailAndPassword(auth, email, password)
    console.log(authData.user, 'USER')
    await fetch(`${process.env.NEXT_PUBLIC_NEXTJS_API_ROUTE}/login`, {
      method: 'POST',
      headers: {
        'x-auth-token': authData.user.accessToken,
        'x-auth-refresh-token': authData.user.refreshToken
      }
    })
    Router.push('/')

    return authData
  } catch (e) {
    console.log('err', e)
  }
}
