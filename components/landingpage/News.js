import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ClockIcon, LinkIcon, PaperClipIcon, PencilIcon, SaveIcon, XIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useAuth } from '../../contexts/auth';
import Api from "../../config/api";
import DataApi from '../../config/data-api'
import Cookies from 'js-cookie'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function News() {
  const authenticate = useAuth()
  const [showEdit, setShowEdit] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(true)

  const token = Cookies.get('token');
  if (token) {
    Api.defaults.headers.Authorization = 'Bearer ' + token;
    DataApi.defaults.headers.Authorization = 'Bearer ' + token;
  }

  // toggle edit mode
  function toggle() {
    setShowEdit(!showEdit)
    setShowForm(!showForm)
  }

  useEffect(() => {
    if (authenticate.user) {
      setShowEdit(true)
    } else {
      setShowEdit(false)
      setShowForm(false)
    }
  })

  // GET API News public Data
  useEffect(() => {
    (
      async () => {
        while(loading) {
          try {
            const { data: news} = await Api.get('/news');
            if (news) {
              setTitle(news[0].title)
              setContent(news[0].content)
              setImage(news[0].image)
            }
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
          // Timeout
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    )()
  }, [])
    

  // POST API News Data
  const submit = async (e) => {
    e.preventDefault();

    const error = 0
    
    if (document.querySelector('#image').files[0]) {
      try {
        var formdata = new FormData()
        formdata.append('image', document.querySelector('#image').files[0])

        const { data: newsImageUpload } = await DataApi.post('/upload', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (newsImageUpload) {
          // upload new image url to database
          setImage(newsImageUpload.data.imageUrl)

          // upload new news to database
          try {
            const { data: newsImage} = await Api.put('/news', {
              "image": newsImageUpload.data.imageUrl,
            });
            if (newsImage) {
              setImage(newsImage.image)
            }
            // clear form
            document.querySelector('#image').value = ''
          } catch (err) {
            console.log(err)
          }
        } else {
          error = 1
        }
      } catch (err) {
        error = 1
      }
    }

    try {
      const { data: newsText } = await Api.put('/news', {
        "title": document.querySelector('#title').value,
        "content": document.querySelector('#content').value,
      });
      if (newsText) {
        setTitle(newsText.title)
        setContent(newsText.content)
        setImage(newsText.image)
      } 
    } catch (err) {
      console.log(err)
      error = 2
    }

    if (error === 0) {
      Swal.fire({
        title: 'Erfolgreich gespeichert',
        icon: 'success',
        showConfirmButton: false,
        toast: true,
        position: 'top',
        timer: 2500,
        timerProgressBar: true,
      })
    } else if (error === 1) {
      Swal.fire({
        title: 'Fehler beim Hochladen',
        text: 'Bild konnte nicht hochgeladen werden',
        icon: 'error',
        showConfirmButton: false,
        toast: true,
        position: 'top',
        timer: 2500,
        timerProgressBar: true,
      })
    } else if (error === 2) {
      Swal.fire({
        title: 'Fehler beim Speichern',
        text: 'News Text konnte nicht gespeichert werden',
        icon: 'error',
        showConfirmButton: false,
        toast: true,
        position: 'top',
        timer: 2500,
        timerProgressBar: true,
      })
    }

    setShowForm(false)
  }
    
  return (
    <div className="py-3 pt-10 sm:max-w-xl sm:mx-auto">
      <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
          NEWS
      </h1>
      
      <div className="px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-14 sm:pb-10">
        <div className="max-w-md mx-auto">

          {loading ?
          <div>
            <Skeleton height={100} width={200} count={1} />
            <Skeleton height={40} width={200} count={2} />
          </div>
          :
          <div
            style={{
              display: showForm ? "none" : "block"
              }}
          >
            <div>
              <img src={image} className="" />
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8  leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                    <span className="block text-blue-500">{title}</span>
                </h1>
                <p className="whitespace-pre-line">{content}</p>
              </div>
            </div>
          </div>
          }

          <div style={{
            display: showForm ? "block" : "none"
            }}
          >
            <form onSubmit={submit} className="">
              <div className="text-center mb-6">
                <h1 className="font-bold text-blue-500 text-2xl" >News bearbeiten</h1>
              </div>
              {/* Title input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Titel
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue={title}
                  />
                </div>
              </div>
              {/* Content input */}
              <div className="mt-5">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Beschreibung
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="content"
                    id="content"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue={content}
                  />
                </div>
              </div>

              {/* Image input */}
              <div className="mt-5">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Bild
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  // onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="de"
                />
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mt-8">
                  Aktuelles Bild <LinkIcon className="-ml-0.5 mr-2 h-4 w-4 inline" aria-hidden="true" />
                </label>
                <a href={image} target="_blank" rel="noopener noreferrer" className="underline decoration-sky-500">
                  {image}
                </a>
                  {/* <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Attach a file</span> */}
              </div>
              <div className="pt-6">
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={submit}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <SaveIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Speichern
                  </button>
                </div>
                
                <div className="flex justify-center mt-3">
                  <button
                    type="button"
                    onClick={toggle}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <XIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Abbrechen
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div 
            className="mb-6"  
            style={{
              display: showEdit & !showForm ? "block" : "none"
            }}
          >
            <button
              onClick={toggle}
              type="button"
              className="shadow-lg float-right inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Bearbeiten
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default News