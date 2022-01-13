import '../styles/globals.css'
import Head from 'next/head'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'

import theme from '../src/theme';

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Notification sys</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  )
}

export default MyApp
