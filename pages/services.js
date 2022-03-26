import Service from "../components/services/Service"
import Head from 'next/head'
import { useAuth } from "../contexts/auth";
import { useEffect, useState } from 'react';
import Api from "../config/api";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Services() {
  const authenticate = useAuth();
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])

  if (authenticate.user) {

  } else {
  }

  // GET API Services public Data
  useEffect(() => {
    (
      async () => {
        while(loading) {
          try {
            const { data: services} = await Api.get('/api/v1/services');
            if (services) {
              setLoading(false)
              setServices(services)
            }
          } catch (error) {
            console.log(error);
          }
          // Timeout
          await new Promise(resolve => setTimeout(resolve, 10000));
        }
      }
    )()
  }, [])


  return (
    <>
      <Head>
        <title>Autokueng - Services</title>
      </Head>
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