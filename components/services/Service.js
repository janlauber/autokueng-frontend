import { SpeakerphoneIcon, ViewGridAddIcon, XIcon, PhotographIcon, SaveIcon } from '@heroicons/react/solid'
import React, { useState } from "react"
import { useAuth } from "../../contexts/auth"
import ServiceCard from './ServiceCard'
import Api from "../../config/api"
import DataApi from '../../config/data-api'
import Swal from 'sweetalert2'

function Service({ services }) {
    const authenticated = useAuth()
    const [show, setShow] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    function closeAlert() {
        setShow(!show);
    }

    function toggle() {
        setShowServiceForm(!showServiceForm);
        // reset form
        document.getElementById("service-form").reset();
        document.getElementById("image-preview").src = "";
        document.getElementById("image-preview").style.display = "none";
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(document.querySelector("#title").value)

        const error = 0;

        const formDataText = new FormData()
        const formDataImage = new FormData()
        formDataText.append("title", document.querySelector("#title").value)
        formDataText.append("content", document.querySelector("#content").value)
        formDataImage.append("image", document.querySelector("#image").files[0])

        try {
            const { data: serviceImageUpload } = await DataApi.post('/upload', formDataImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (serviceImageUpload) {
                try {
                    const { data: serviceUpload } = await Api.post(`/services`, {
                        "title": document.querySelector("#title").value,
                        "content": document.querySelector("#content").value,
                        "image": serviceImageUpload.data.imageUrl,
                    });
                    if (serviceUpload) {
                        // add service to state
                        services.push(serviceUpload)
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
              position: 'top',
              timer: 2500,
              timerProgressBar: true,
            })
          } else if (error === 1) {
            Swal.fire({
              title: 'Fehler beim Speichern',
              text: 'Service konnte nicht hochgeladen werden',
              icon: 'error',
              showConfirmButton: false,
              toast: true,
              position: 'top',
              timer: 2500,
              timerProgressBar: true,
            })
          } 

    }

    let heading = (
        <div className="my-6 text-center">
            <h1 className="my-2 font-bold text-4xl">SERVICES</h1>
            <h2 className="text-xl text-blue-500 font-semibold">Unsere Dienstleistungen im Überblick</h2>
        </div>
    )

    let addButton = (
        <div
            className="justify-self-center"
            style={{
                display: showServiceForm ? "none" : "block"
            }}
        >
            <button
                onClick={toggle}
                type="button"
                className="float-left inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
            >
                <ViewGridAddIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Service hinzufügen
            </button>
        </div>
    )

    let serviceForm = (
        <div
            style={{
                display: showServiceForm ? "block" : "none"
            }}
            className="flex lg:mx-80 lg:border lg:rounded-xl lg:shadow-md bg-gray-50 lg:my-10"
        >
            <div className="py-10 px-8">
                <h2 className="text-xl text-blue-500 font-semibold">Service hinzufügen</h2>

                <form id="service-form" onSubmit={handleSubmit}>
                    {/* Title input */}
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
                    {/* Content input */}
                    <div className="mt-5">
                        <label className="block text-sm font-medium text-gray-700">
                            Beschreibung
                        </label>
                        <div className="mt-1">
                            <textarea
                                rows={4}
                                name="content"
                                id="content"
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
                        <div className="flex justify-center">
                            <button
                                type="submit"
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
    )

    try {
        if (authenticated.user) {
            return (
                <div className="grid">
                    {heading}

                    {addButton}

                    {serviceForm}

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">



                        {services.map((service) => (
                            // <div className="" key={service.ID}>


                            <ServiceCard key={service.ID} service={service} className="" />


                            // </div>

                        ))}

                    </div>
                </div>
            )
        } else {
            return (
                <div className="">
                    {heading}
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">

                        {services.map((service) => (
                            <div className="flex p-3 items-center justify-center bg-white" key={service.ID}>

                                <div className="w-80 rounded-2xl border shadow py-12 px-8 hover:-translate-y-1 hover:shadow-2xl delay-75 duration-100">

                                    <p className="text-3xl text-gray-700 font-semibold"> {service.title} </p>
                                    <p className="text-sm text-gray-700 font-light mt-2 leading-7"> {service.content} </p>
                                    <div className="">
                                        <img src={service.image} />
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            )
        }
    } catch (error) {
        // incase of error
        return (
            <div className="">
                {heading}
                <div
                    style={{
                        display: show ? "none" : "block"
                    }}
                    className="block inset-x-0 pb-2 sm:pb-5"
                >
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="p-2 rounded-lg bg-red-400 shadow-lg sm:p-3">
                            <div className="flex items-center justify-between flex-wrap">
                                <div className="w-0 flex-1 flex items-center">
                                    <span className="flex p-2 rounded-lg bg-white">
                                        <SpeakerphoneIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                                    </span>
                                    <p className="ml-3 font-medium text-white truncate">
                                        <span className="md:hidden">No Services found!</span>
                                        <span className="hidden md:inline">No Services found! Report at <a className="font-bold underline" href="mailto:info@autokueng.ch">info@autokueng.ch</a></span>
                                    </p>
                                </div>
                                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                </div>
                                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                                    <button
                                        onClick={closeAlert}
                                        type="button"
                                        className="-mr-1 flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        <span className="sr-only">Dismiss</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Service