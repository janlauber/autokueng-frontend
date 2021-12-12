import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from '../components/Navbar'
import { Fragment, useContext, useEffect, useState } from 'react'


function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState()
  const [user, setUser] = useState()

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
            if (res.status === 200 && json.message === 'authorized') {
              setAuth(true)
              setUser(json.username)
            } else {
              setAuth(false)
              setUser(null)
            }
          } catch (err) {
            setAuth(false)
            setUser(null)
          }
        }
      )()
    }, [])
  return(
    <Layout 
      updateState={updateState}
      auth={auth}
      user={user}
      >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
