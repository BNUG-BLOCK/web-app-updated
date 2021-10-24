import '../styles/globals.css'
import { NextComponentType, NextPageContext } from 'next'


// custom type for the app to enable getlayout typings


function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
export default MyApp
