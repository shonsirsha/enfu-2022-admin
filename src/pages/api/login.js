import cookie from 'cookie'

export default async function login(req, res) {
  if (req.method === 'POST') {
    const authToken = req.headers['x-auth-token']
    const refreshToken = req.headers['x-auth-refresh-token']

    if (!authToken || !refreshToken) {
      return res.status(401).json({ message: 'Unauthorized', success: false })
    }

    res.setHeader('Set-Cookie', [
      cookie.serialize('token', authToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/'
      }),
      cookie.serialize('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 60 * 60 * 60,
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

    res.status(200).json({
      message: 'Authenticated',
      success: true
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
