import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { AuthProvider } from '../contexts/auth'

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
