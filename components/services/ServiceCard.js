
import { ClockIcon, LinkIcon, PaperClipIcon, PencilIcon, PhotographIcon, SaveIcon, TrashIcon, XIcon } from '@heroicons/react/solid'
import React, { useState } from "react"
import Swal from 'sweetalert2'
import Api from "../../config/api"
import DataApi from '../../config/data-api'
import Cookies from 'js-cookie'

export default function ServiceCard({ service }) {
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState(service.title)
    const [content, setContent] = useState(service.content)
    const [image, setImage] = useState(service.image)

    const uniqueTitleID = `title-${service.ID}`
    const uniqueContentID = `content-${service.ID}`
    const uniqueImageID = `image-${service.ID}`
    const uniqueCardID = `card-${service.ID}`

    const token = Cookies.get('token');
    if (token) {
        Api.defaults.headers.Authorization = 'Bearer ' + token;
        DataApi.defaults.headers.Authorization = 'Bearer ' + token;
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst es nicht zurückholen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, löschen!',
            cancelButtonText: 'Nein'
        }).then((result) => {
            if (result.value) {
                Api.delete(`/services/${service.ID}`)
                    .then(res => {
                        Swal.fire({
                            title: 'Gelöscht!',
                            text: 'Dein Service wurde gelöscht.',
                            icon: 'success',
                            showConfirmButton: false,
                            toast: true,
                            position: 'top-start',
                            timer: 2000,
                            timerProgressBar: true,
                        })
                        document.getElementById(uniqueCardID).remove()
                    })
                    .catch(err => {
                        Swal.fire(
                            'Error!',
                            'Service konnte nicht gelöscht werden.',
                            'error'
                        )
                    })
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const error = 0

        if (document.getElementById(uniqueImageID).files[0]) {
            try {
                var formdata = new FormData()
                formdata.append('image', document.getElementById(uniqueImageID).files[0])

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
                        const { data: newsImage } = await Api.put(`/services/${service.ID}`, {
                            "image": newsImageUpload.data.imageUrl,
                        });
                        if (newsImage) {
                            setImage(newsImage.image)
                        }
                        // clear form
                        document.querySelector(uniqueImageID).value = ''
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    error = 1
                }
            } catch (err) {
                console.log(err)
                error = 1
            }
        }

        try {

            const { data: serviceResponse } = await Api.put(`/services/${service.ID}`, {
                "title": document.getElementById(uniqueTitleID).value,
                "content": document.getElementById(uniqueContentID).value,
            })

            // if status is 200, then update the state
            if (serviceResponse && error === 0) {
                setTitle(serviceResponse.title)
                setContent(serviceResponse.content)
                setImage(serviceResponse.image)
                setShowForm(false)
            }

        } catch (err) {
            error = 2
        }

        if (error === 0) {
            Swal.fire({
                title: 'Erfolgreich gespeichert',
                icon: 'success',
                showConfirmButton: false,
                toast: true,
                position: 'top-start',
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
                position: 'top-start',
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
                position: 'top-start',
                timer: 2500,
                timerProgressBar: true,
            })
        }
    }

    function toggle() {
        setShowForm(!showForm)
    }

    let edit = (
        <div className="mt-3 -mb-5">
            <button
                onClick={toggle}
                type="button"
                className="float-left shadow-lg inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Bearbeiten
            </button>
            <button
                onClick={handleDelete}
                type="button"
                className="float-right shadow-lg inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <TrashIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
            </button>
        </div>
    )

    return (
        <div id={uniqueCardID} className='flex p-3 items-center justify-center bg-white'>
            <div className="w-80 rounded-2xl border shadow py-12 px-8 hover:-translate-y-1 hover:shadow-2xl delay-75 duration-100">
                <div style={{
                    display: showForm ? "none" : "block"
                }}
                >
                    <p className="text-3xl text-gray-700 font-semibold"> {title}</p>
                    <p className="text-sm text-gray-700 font-light mt-2 leading-tight whitespace-pre-line"> {content} </p>
                    <div className="">
                        <img src={image} />
                    </div>
                    {edit}
                </div>
                <div style={{
                    display: showForm ? "block" : "none"
                }}
                    className=""
                >
                    <form className="">
                        {/* Title input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Titel
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="title"
                                    id={uniqueTitleID}
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={title}
                                />
                            </div>
                        </div>
                        {/* Content input */}
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700">
                                Beschreibung
                            </label>
                            <div className="mt-1">
                                <textarea
                                    rows={4}
                                    name="content"
                                    id={uniqueContentID}
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={content}
                                />
                            </div>
                        </div>

                        {/* Image input */}
                        <div className="mt-5 place-content-center">
                            <div className="flex justify-center">
                                <label htmlFor={uniqueImageID}
                                    className="inline-flex cursor-pointer items-center px-3 py-2 border border-blue-500 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <PhotographIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Bild auswählen
                                </label>
                            </div>
                            <input id={uniqueImageID} name="image" type="file" className='absolute hidden' />
                        </div>
                        <div className="pt-6">
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="cursor-pointer inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            </div>
        </div>
    )
}