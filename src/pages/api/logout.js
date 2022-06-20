import cookie from 'cookie'

export default async function login(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      }),
      cookie.serialize('refresh_token', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      }),
      cookie.serialize('token_expires_in', '', {
        httpOnly: false,
        secure: true,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      })
    ])

    res.status(200).json({
      message: 'Logged out',
      success: true
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
