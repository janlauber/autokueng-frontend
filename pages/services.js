import Services from "../components/services/Services"

// get API Data
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const services = await res.json()
  
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
        <Services services={services} />
      </>
    )
  }
  