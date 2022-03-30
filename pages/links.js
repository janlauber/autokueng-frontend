import Heading from "../components/Heading"
import Api from "../config/api"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react'
import Link from '../components/links/link'

export default function Links() {
  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState([])

  // GET API Services public Data
  useEffect(() => {
    (
      async () => {
        try {
          const { data: links } = await Api.get('/links');
          if (links) {
            setLinks(links)
          }
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      }
    )(loading)
  }, [])

  return (
    <div>
      <Heading title="LINKS" subtitle="Nützliche Links" />
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
        links.map((link) => (
          <Link link={link} />
        ))
      }
    </div>
  )
}
