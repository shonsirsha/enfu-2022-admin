import { auth } from '../src/Firebase'
import { signOut } from 'firebase/auth'

export default async function logout(email, password) {
  try {
    await signOut(auth)

    await fetch(`${process.env.NEXT_PUBLIC_NEXTJS_API_ROUTE}/logout`, {
      method: 'POST'
    })
  } catch (e) {
    console.log('err', e)
  }
}
