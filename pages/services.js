import Services from "../components/services/Services"
import Head from 'next/head'
import Navbar from '../components/Navbar'

// get API Data
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const services = await res.json()
  if(!services) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      services,
    },

    revalidate: 10,
  }
}

export default function Fahrzeugpark({services}) {
    return (
      <>
        <Head>
          <title>Autokueng - Services</title>
        </Head>
        <Services services={services} />
      </>
    )
  }
  