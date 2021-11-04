import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'
import AuthProvider from './../store/AuthProvider';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {
  if( typeof window !== "undefined" ){
    return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
  }else{
    return <h1>test</h1>
  }

}

export default MyApp
