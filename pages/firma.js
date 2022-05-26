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
        null
        :
        <Team members={members} />
      }
      <HeaderSection theme="Unsere Bilder" title="GALERIE" description="Eindrücke des Alltages" />
      {loadingGallery ?
        null
        :
        <Gallery carouselItems={carouselItems} />
      }
    </div>
  )
}
