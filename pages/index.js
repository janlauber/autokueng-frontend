import News from '../components/landingpage/News'
import HeroCard from '../components/landingpage/HeroCard'
import About from '../components/landingpage/About'
import Services from '../components/landingpage/Services'
import Stats from '../components/landingpage/Stats'
import Head from 'next/head'

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos/1')
  const news = await res.json()
  
  return {
    props: {
      news,
    },
  }
}

export default function Home({news}) {
  return (
    <>
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
