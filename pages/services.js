import Service from "../components/services/Service"
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Api from "../config/api";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Heading from "../components/Heading";

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
          <div className="p-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 place-items-stretch h-80">
            {/* <Skeleton className="justify-self-auto" height={200} width={200} count={6} inline="true"/> */}
            <div>
              <Skeleton height="100%" width="100%" />
            </div>
            <div>
              <Skeleton height="100%" width="100%" />
            </div>
            <div>
              <Skeleton height="100%" width="100%" />
            </div>
            <div>
              <Skeleton height="100%" width="100%" />
            </div>
          </div>
          :
          <Service services={services} />
        }
      
    </>
  )
}

export default Services;