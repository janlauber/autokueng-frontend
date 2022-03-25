import News from '../components/landingpage/News'
import HeroCard from '../components/landingpage/HeroCard'
import About from '../components/landingpage/About'
import Services from '../components/landingpage/Services'
import Stats from '../components/landingpage/Stats'
import Head from 'next/head'

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Autokueng</title>
      </Head>
      <HeroCard />
      <News />
      <About />
      <Services />
      <Stats stats=""/>
    </>
  )
}
