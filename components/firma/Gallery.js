import { useAuth } from "../../contexts/auth";
import { PhotographIcon, SaveIcon, TrashIcon, XCircleIcon } from "@heroicons/react/solid";
import Swal from 'sweetalert2'
import Api from "../../config/api"
import DataApi from "../../config/data-api"
import React, { useState, useEffect } from "react";
import Lightbox from 'react-image-lightbox';

export default function Gallery({ carouselItems }) {
    const authenticate = useAuth();
    const [showForm, setShowForm] = useState(false)
    const [showLightbox, setShowLightbox] = useState(false)

    useEffect(() => {
        // render Lightbox
        if (showLightbox) {
            console.log("render Lightbox")
        } else {
            console.log("remove Lightbox")
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log()

        const error = 0;

        const formDataText = new FormData()
        const formDataImage = new FormData()
        formDataText.append("title", document.querySelector("#title").value)
        formDataImage.append("image", document.querySelector("#galleryimage").files[0])

        try {
            const { data: galleryImageUpload } = await DataApi.post('/upload', formDataImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (galleryImageUpload) {
                try {
                    const { data: galleryUpload } = await Api.post(`/gallery-images`, {
                        "title": document.querySelector("#title").value,
                        "image": galleryImageUpload.data.imageUrl,
                    });
                    if (galleryUpload) {
                        // add galleryImage Gallery

                        carouselItems.push(galleryUpload)
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
                text: 'Bild konnte nicht hochgeladen werden',
                icon: 'error',
                showConfirmButton: false,
                toast: true,
                position: 'bottom-end',
                timer: 2500,
                timerProgressBar: true,
            })
        }
    }

    function toggle() {
        setShowForm(!showForm)
    }

    function AddButton() {
        return (
            <div
                className="flex justify-center mb-10"
            >
                <button
                    style={showForm ? { display: "none" } : {}}
                    onClick={toggle}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                >
                    <PhotographIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Member hinzufügen
                </button>
                {form}
            </div>
        )
    }

    let form = (
        <div
            style={{
                display: showForm ? "block" : "none"
            }}
            className="flex lg:mx-80 lg:border lg:rounded-xl lg:shadow-md bg-gray-50 lg:my-10"
        >
            <div className="py-10 px-8">
                <h2 className="text-xl text-blue-500 font-semibold">Bild hinzufügen</h2>

                <form id="gallery-form" onSubmit={handleSubmit}>
                    {/* Name input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            title
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

                    {/* Image input */}
                    <div className="mt-5 place-content-center">
                        <label className="block text-center pt-3 text-sm font-medium text-gray-400">
                            Ausgewähltes Bild:
                        </label>
                        <img id="galleryimage-preview" className="items-center justify-center h-64 p-2 hidden m-auto" src="" alt="Preview" />
                        <div className="flex justify-center">
                            <label htmlFor="galleryimage"
                                className="inline-flex cursor-pointer items-center px-3 py-2 border border-blue-500 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <PhotographIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                Bild auswählen
                            </label>
                        </div>

                        <input id="galleryimage" name="galleryimage" type="file" className='absolute hidden' required onChange={
                            (e) => {
                                // display image preview
                                let reader = new FileReader()
                                reader.onload = (e) => {
                                    document.getElementById("galleryimage-preview").src = e.target.result
                                }
                                reader.readAsDataURL(e.target.files[0])
                                document.getElementById("galleryimage-preview").style.display = "block"
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
                                    <XCircleIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />

                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )



    return (
        <div>
            {authenticate.user ? <AddButton /> : null}
            <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-rows-3 px-5">
                {carouselItems.map((carouselItem) => (
                    <div key={carouselItem.ID} id={carouselItem.ID}>
                        <div className="lg:h-96 md:h-64 sm:h-64 h-56">
                            <div
                                onClick={() => setShowLightbox(!showLightbox)}
                                className="rounded-lg"
                                style={{
                                    backgroundImage: `url(${carouselItem.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "100%",
                                    width: "100%",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >
                            </div>
                        </div>
                        <div className="mt">
                            {/* <h3>{carouselItem.title}</h3> */}
                            {authenticate.user ? <DeleteButton carouselItem={carouselItem} /> : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



function DeleteButton({ carouselItem }) {

    function handleDelete() {
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
                // split http://localhost:9000 of carouselItem.image
                const imageUrl = carouselItem.image.split("/")
                // get last element of imageUrl
                const imageName = imageUrl[imageUrl.length - 1]

                DataApi.delete(`/images/${imageName}`).then(() => {

                    Api.delete(`/gallery-images/${carouselItem.ID}`)
                        .then(res => {
                            Swal.fire({
                                title: 'Gelöscht!',
                                text: 'Dein Bild wurde gelöscht.',
                                icon: 'success',
                                showConfirmButton: false,
                                toast: true,
                                position: 'bottom-end',
                                timer: 2000,
                                timerProgressBar: true,
                            })
                            // remove div with carouselItem.ID
                            document.getElementById(carouselItem.ID).remove();
                        })
                        .catch(err => {
                            console.log(err)
                            Swal.fire(
                                'Error!',
                                'Bild konnte nicht gelöscht werden.',
                                'error'
                            )
                        })
                }).catch(err => {
                    console.log(err)
                    Swal.fire(
                        'Error!',
                        'Bild konnte nicht gelöscht werden.',
                        'error'
                    )
                })
            }
        })
    }

    return (
        <div>
            <button
                onClick={handleDelete}
                type="button"
                className="shadow-lg inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Löschen
            </button>
        </div>
    )
}