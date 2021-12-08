import Script from 'next/script'
import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Fahrzeugpark() {
    return (
		<>
		<Navbar />
		<div className="text-center">
			<Head>
				<title>Autokueng - Fahrzeugpark</title>
				<script src="https://www.autoscout24.ch/MVC/Content/as24-hci-desktop/js/e.min.js"/>
			</Head>
			<div className="my-6">
				<h1 className="my-2 font-bold text-4xl">FAHRZEUGPARK</h1>
				<h2 className="text-xl text-blue-600 font-semibold">Autoscout24</h2>
			</div>
			<div data-embedded-src="https://www.autoscout24.ch/de/hci/list?design=846&filter=1276" className="embedded-content-area"></div>
		</div>
		</>
    )
  }

  