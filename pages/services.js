import Services from "../components/services/Services"
import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Fahrzeugpark(props) {
    return (
      <>
        <Head>
          <title>Autokueng - Services</title>
        </Head>
        <Services auth={props.auth} />
      </>
    )
  }
  