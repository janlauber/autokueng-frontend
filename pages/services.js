import Services from "../components/services/Services"
import Head from 'next/head'
import { useAuth } from "../contexts/Auth"

function Fahrzeugpark(props) {
  const { user, loading } = useAuth();
  const showSkeleton = isValidating || loading;

  return (
    <>
      <Head>
        <title>Autokueng - Services</title>
      </Head>
      <Services/>
      {showSkeleton && <Skeleton height={200} count = {3} />}
    </>
  )
}

export default Fahrzeugpark;