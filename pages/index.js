import News from '../components/landingpage/News'
import HeroCard from '../components/landingpage/HeroCard'
import About from '../components/landingpage/About'
import Services from '../components/landingpage/Services'
import Stats from '../components/landingpage/Stats'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Fragment, useEffect, useState } from 'react'

export default function Home() {
  return (
    <>
      <Navbar />
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
