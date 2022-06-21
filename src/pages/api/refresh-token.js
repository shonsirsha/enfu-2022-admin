import cookie from 'cookie'
import { parseCookies } from '../../../utils/cookies'

export default async function refreshToken(req, res) {
  if (req.method === 'POST') {
    const { refresh_token } = parseCookies(req)

    if (!refresh_token) {
      return res.status(401).json({ message: 'Unauthorized', success: false })
    }

    const freshTokenRes = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=AIzaSyDcIA5FmgvRQmPNdyy_YhuhU1gokyVViF0`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token
        })
      }
    )

    if (freshTokenRes.ok) {
      const freshToken = await freshTokenRes.json()

      console.log('freshToken', freshToken)

      res.setHeader('Set-Cookie', [
        cookie.serialize('token', freshToken.access_token, {
          httpOnly: true,
          secure: true,
          maxAge: 2160000,
          sameSite: 'strict',
          path: '/'
        }),
        cookie.serialize('token_expires_in', parseInt(Date.now() + 60 * 60 * 1000), {
          httpOnly: false,
          secure: true,
          maxAge: 60 * 60 * 60 * 60 * 60,
          sameSite: 'strict',
          path: '/'
        })
      ])

      return res.status(200).json({
        message: 'Authenticated - Refreshed',
        success: true,
        freshToken: freshToken.access_token
      })
    }

    //At this point you're screwed as fuck
    return res.status(freshTokenRes.status).json({ message: 'Error', success: false })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
