import News from '../components/News'
import HeroCard from '../components/HeroCard'

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
      <HeroCard />
      <News data={news} />
    </>
  )
}
