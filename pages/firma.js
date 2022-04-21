import Heading from "../components/Heading"
import Api from "../config/Api"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react'
import Team from "../components/firma/Team"
import Gallery from "../components/firma/Gallery"
import HeaderSection from "../components/HeaderSection"


export default function Firma() {
  const [loadingTeam, setLoadingTeam] = useState(true)
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [members, setMembers] = useState([])
  const [carouselItems, setCarouselItems] = useState([])

  // GET API Services public Data
  useEffect(() => {
    (
      async () => {
        try {
          const { data: members } = await Api.get('/members');
          if (members) {
            setMembers(members)
          }
          setLoadingTeam(false)
        } catch (error) {
          console.log(error);
        }
      }
    )(loadingTeam),
    (
      async () => {
        try {
          const { data: carouselItems } = await Api.get('/gallery-images');
          if (carouselItems) {
            setCarouselItems(carouselItems)
          }
          setLoadingGallery(false)
        } catch (error) {
          console.log(error);
        }
      }
    )(loadingGallery)
  }, [])

  return (
    <div>
      <Heading title="FIRMA" subtitle="Unsere Firma im Überblick" />
      {loadingTeam ?
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
        <Team members={members} />
      }
      <HeaderSection theme="Unsere Bilder" title="GALERIE" description="Eindrücke des Altages" />
      {loadingGallery ?
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
        <Gallery carouselItems={carouselItems} />
      }
    </div>
  )
}
