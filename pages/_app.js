import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from '../components/Navbar'
import { Fragment, useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState()

    const updateState = () => {
        setAuth(!auth)
    }

  // Get if Logged in
  useEffect(() => {
      (
        async () => {
          try {
            const res = await fetch('http://localhost:8000/api/v1/user', {
              credentials: 'include',
              }) 
            const json = await res.json()
            
            if (json.username !== undefined) {
              setAuth(true)
            } else {
              setAuth(false)
            }
          } catch (err) {
            setAuth(false)
          }
        }
      )()
    }, [])
  return(
    <Layout 
      updateState={updateState}
      auth={auth}
      >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
