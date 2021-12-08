import News from '../components/landingpage/News'
import HeroCard from '../components/landingpage/HeroCard'
import About from '../components/landingpage/About'
import Services from '../components/landingpage/Services'
import Stats from '../components/landingpage/Stats'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Fragment, useEffect, useState } from 'react'

// export async function getServerSideProps() {
//   const res = await fetch('http://localhost:8000/api/v1/news', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   const news = await res.json()

//   if(!news) {
//     throw new Error('No news found')
//   }
//   return {
//     props: {
//       news,
//     },
//   }
// }

export default function Home() {

  const [news, setNews] = useState([])
  useEffect(() => {
    (
      async () => {
        try {
          const res = await fetch('http://localhost:8000/api/v1/news', {
            credentials: 'include',
            }) 
          const json = await res.json()
          
          if(!json) {
            throw new Error('No news found')
          }

          setNews(json)
        } catch (error) {
          console.log(error)
        }
      }
    )()
  }, [])
  return (
    <>
      <Navbar />
      <Head>
        <title>Autokueng</title>
      </Head>
      <HeroCard />
      <News data={news} />
      <About />
      <Services />
      <Stats stats=""/>
    </>
  )
}
