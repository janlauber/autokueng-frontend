import Service from "../components/services/Service"
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Api from "../config/Api";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Heading from "../components/Heading";
import ServiceHeroCard from "../components/landingpage/ServiceHeroCard";

function Services() {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])

  // GET API Services public Data
  useEffect(() => {
    (
      async () => {
          try {
            const { data: services} = await Api.get('/services');
            if (services) {
              setServices(services)
            }
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
      }
    )(loading)
  }, [])


  return (
    <>
      <Head>
        <title>Autokueng - Services</title>
      </Head>
      <Heading title="SERVICES" subtitle="Unsere Services und Dienstleistungen" />
      {loading ?
          null
          :
          <Service services={services} />
        }
      <ServiceHeroCard />
    </>
  )
}

export default Services;