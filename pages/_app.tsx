//@ts-nocheck
import '../styles/globals.css'
import Head from 'next/head'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

import theme from '../src/theme';

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Notification sys</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </Head>

      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={5}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </MuiThemeProvider>
    </>
  )
}

export default MyApp
