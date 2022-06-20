// ** Next Imports
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Router } from 'next/router'
import readCookieClient from '../../utils/readCookieClient'
import refreshToken from '../../services/refreshToken'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const minutechecker = () => {
    const tokenExprIn = readCookieClient('token_expires_in')
    if (tokenExprIn) {
      return Math.round((parseInt(tokenExprIn) - Date.now()) / 60000)
    }

    return 1000
  }

  useEffect(() => {
    const tokenRefreshInterval = setInterval(() => {
      let exprIn = minutechecker()

      if (exprIn <= 25) {
        console.log('REFRESHING TOKEN...')
        refreshToken().then(() => {
          console.log('token refreshed...')
        })
      } else {
        console.log('Still lives longer')
      }
      console.log(minutechecker())
    }, 60 * 5 * 1000) // every 3 minutes

    return () => clearInterval(tokenRefreshInterval)
  }, [])

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Enfution Admin</title>
        <meta name='description' content={`Enfution Admin Page`} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
