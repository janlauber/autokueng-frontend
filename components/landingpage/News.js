import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ClockIcon, PaperClipIcon, PencilIcon, SaveIcon, XIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'


function News(props) {
  const [showEdit, setShowEdit] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [picture, setPicture] = useState()
  const [selectedFile, setSelectedFile] = useState(null)
  const [auth, setAuth] = useState()

  useEffect(() => {
    setAuth(props.auth)
  }, [props.auth])

  // toggle edit mode
  function toggle() {
    setShowEdit(!showEdit)
    setShowForm(!showForm)
  }

  useEffect(() => {
    if (auth === true) {
      setShowEdit(true)
    } else {
      setShowEdit(false)
    }
  }, [auth])

  // check if the user is logged in
  // useState(() => {
  //   (
  //     async () => {
  //       try {
  //         const res2 = await fetch('http://localhost:8000/api/v1/user', {
  //           credentials: 'include',
  //           })
  //         const login = await res2.json()

  //         if (login.username !== undefined) {
  //           you are logged in
  //           setShowEdit(true)
  //         } else {
  //           you are not logged in
  //           setNews(
  //             <>
  //             </>
  //           )
  //         }
  //       } catch (error) {
  //       }
  //     }
  //   )()
  // }, [])

  // GET API News public Data
  useState(() => {
    (
      async () => {
        try {
          const res = await fetch('http://localhost:8000/api/v1/news', {
            credentials: 'include',
            })
          const json = await res.json()

          if(!json) {
            setTitle('Keine News gefunden')
            setContent('Leider konnten wir keine News finden')
            setPicture('')
          }

          setTitle(json[0].title)
          setContent(json[0].content)
          setPicture(json[0].picture)
        } catch (error) {
          setTitle('Keine News gefunden')
          setContent('Leider ist ein Fehler aufgetreten')
          setPicture('')
        }
      }
    )()
  }, [])

  // POST API News Data
  const submit = async (e) => {

    e.preventDefault();
    

    if (selectedFile) {
      try {
        // Upload image to data api

        var formdata = new FormData()
        formdata.append('image', selectedFile)

        const options = {
          method: 'POST',
          credentials: 'include',
          body: formdata,
        }

        const res = await fetch('http://localhost:9000/upload', options)
        const json = await res.json()

        if (res.status === 201) {

          // upload new image url to database

          const uploadUrl = await fetch('http://localhost:8000/api/v1/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(
                {
                    "picture": json.data.imageUrl,
                }
            )})
          const uploadJson = await uploadUrl.json()

          if (uploadUrl.status === 201) {
            Swal.fire({
              icon: 'success',
              toast: true,
              position: 'top-end',
              title: 'Tip top!',
              content: 'Bild wurde hochgeladen',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              customClass: {
                popup: 'bg-blue-500',
              }
            })
          } else {
            Swal.fire({
              icon: 'error',
              toast: true,
              position: 'top-end',
              title: 'News konnte nicht hochgeladen werden',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              customClass: {
                popup: 'bg-red-500',
              }
            })
          }
        } else {
          Swal.fire({
            icon: 'error',
            toast: true,
            position: 'top-end',
            title: 'Fehler beim Speichern des Bildes',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
              popup: 'bg-blue-500',
            }
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          toast: true,
          position: 'top-end',
          title: 'Fehler beim Speichern des Bildes',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: 'bg-blue-500',
          }
        })
      }
    }

    const data = await fetch('http://localhost:8000/api/v1/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(
            {
                title,
                content
            }
        )})
    
    if (data.status === 200) {
      toggle()
      Swal.fire({
        icon: 'success',
        toast: true,
        position: 'top-end',
        title: 'News wurde gespeichert',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'bg-blue-500',
        }
      })
    } else{
      Swal.fire({
        icon: 'error',
        toast: true,
        position: 'top-end',
        title: 'Fehler beim Speichern der News',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'bg-blue-500',
        }
      })
    }
  }
  return (
    <div className="py-3 pt-10 sm:max-w-xl sm:mx-auto">
      <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
          NEWS
      </h1>
      <div className="px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-14 sm:pb-10">
        <div className="max-w-md mx-auto">
          <div
            style={{
              display: showForm ? "none" : "block"
              }}
          >
            <div>
              <img src={picture} className="" />
              {picture}
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
                    onChange={(e) => setTitle(e.target.value)}
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
                    onChange={(e) => {
                      setContent(e.target.value)
                    }}
                  />
                </div>
              </div>

              {/* Picture input */}
              <div className="mt-5">
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className=""
                />
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