import Heading from "../components/Heading"
import Api from "../config/api"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react'
import Link from '../components/links/link'
import { SpeakerphoneIcon, ViewGridAddIcon, XCircleIcon, PhotographIcon, SaveIcon, UserAddIcon } from '@heroicons/react/solid';
import { useAuth } from "../contexts/auth"
import DataApi from '../config/data-api'
import Swal from 'sweetalert2'

export default function Links() {
  const authenticate = useAuth()
  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState([])
  const [showForm, setShowForm] = useState(false)

  function toggle() {
    setShowForm(!showForm)
    document.getElementById("link-form").reset();
    document.getElementById("image-preview").src = "";
    document.getElementById("image-preview").style.display = "none";
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log()

    const error = 0;

    const formDataText = new FormData()
    const formDataImage = new FormData()
    formDataText.append("title", document.querySelector("#title").value)
    formDataText.append("description", document.querySelector("#description").value)
    formDataText.append("url", document.querySelector("#url").value)
    formDataImage.append("image", document.querySelector("#image").files[0])

    try {
      const { data: linkImageUpload } = await DataApi.post('/upload', formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (linkImageUpload) {
        try {
          const { data: linkUpload } = await Api.post(`/links`, {
            "title": document.querySelector("#title").value,
            "description": document.querySelector("#description").value,
            "url": document.querySelector("#url").value,
            "image": linkImageUpload.data.imageUrl,
          });
          if (linkUpload) {
            // add link to state
            links.push(linkUpload)
          }
          // clear form
          toggle();
        } catch (err) {
          error = 1
          console.log(err)
        }
      } else {
        error = 1
      }
    } catch (err) {
      error = 1
      console.log(err)
    }

    if (error === 0) {
      Swal.fire({
        title: 'Erfolgreich gespeichert',
        icon: 'success',
        showConfirmButton: false,
        toast: true,
        position: 'bottom-end',
        timer: 2500,
        timerProgressBar: true,
      })
    } else if (error === 1) {
      Swal.fire({
        title: 'Fehler beim Speichern',
        text: 'Link konnte nicht hochgeladen werden',
        icon: 'error',
        showConfirmButton: false,
        toast: true,
        position: 'bottom-end',
        timer: 2500,
        timerProgressBar: true,
      })
    }
  }

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

  let addButton = (
    <div
      className=""
      style={{
        display: showForm ? "none" : "inline-block",
      }}
    >
      <button
        onClick={toggle}
        type="button"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
      >
        <UserAddIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Link hinzufügen
      </button>
    </div>
  )

  let form = (
    <div
      style={{
        display: showForm ? "block" : "none"
      }}
      className="flex lg:mx-80 lg:border lg:rounded-xl lg:shadow-md bg-gray-50"
    >
      <div className="py-10 px-8">
        <h2 className="text-xl text-blue-500 font-semibold">Link hinzufügen</h2>

        <form id="link-form" onSubmit={handleSubmit}>
          {/* Titel input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titel
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          {/* Description input */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Beschreibung
            </label>
            <div className="mt-1">
              <textarea
                type="text"
                name="description"
                id="description"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          {/* URL input */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="url"
                id="url"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Image input */}
          <div className="mt-5 place-content-center">
            <label className="block text-center pt-3 text-sm font-medium text-gray-400">
              Ausgewähltes Bild:
            </label>
            <img id="image-preview" className="items-center justify-center h-64 p-2 hidden m-auto" src="" alt="Preview" />
            <div className="flex justify-center">
              <label htmlFor="image"
                className="inline-flex cursor-pointer items-center px-3 py-2 border border-blue-500 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PhotographIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Bild auswählen
              </label>
            </div>

            <input id="image" name="image" type="file" className='absolute hidden' required onChange={
              (e) => {
                // display image preview
                let reader = new FileReader()
                reader.onload = (e) => {
                  document.getElementById("image-preview").src = e.target.result
                }
                reader.readAsDataURL(e.target.files[0])
                document.getElementById("image-preview").style.display = "block"
              }
            } />

          </div>
          <div className="pt-6">
            <div className="pt-6">
              <div className="py-3">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="float-left shadow-lg inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <SaveIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Speichern
                </button>
                <button
                  onClick={toggle}
                  type="button"
                  className="float-right shadow-lg inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <XCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  if (authenticate.user) {
  } else {
    form = null
    addButton = null
  }

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
        <div>
          <div className=" grid place-items-center my-5">
            {addButton}
            {form}
          </div>
          {links.map((link) => (
            <Link key={link.ID} link={link} />
          ))}

        </div>
      }
    </div>
  )
}
