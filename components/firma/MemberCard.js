import { useAuth } from "../../contexts/auth"
import { ClockIcon, LinkIcon, PaperClipIcon, PencilIcon, PhotographIcon, SaveIcon, TrashIcon, XCircleIcon, XIcon } from '@heroicons/react/solid'
import React, { useState } from "react"
import Swal from 'sweetalert2'
import Api from "../../config/api"
import DataApi from "../../config/data-api"

export default function MemberCard({ member }) {
    const authenticate = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState(member.name);
    const [role, setRole] = useState(member.role);
    const [image, setImage] = useState(member.image);

    const uniqueCardID = `member-card-${member.ID}`;
    const uniqueNameID = `member-name-${member.ID}`;
    const uniqueRoleID = `member-role-${member.ID}`;
    const uniqueImageID = `member-image-${member.ID}`;

    function toggle() {
        setShowForm(!showForm);
    }

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
                Api.delete(`/members/${member.ID}`)
                    .then(res => {
                        Swal.fire({
                            title: 'Gelöscht!',
                            text: 'Dein Mitarbeiter wurde gelöscht.',
                            icon: 'success',
                            showConfirmButton: false,
                            toast: true,
                            position: 'bottom-end',
                            timer: 2000,
                            timerProgressBar: true,
                        })
                        document.getElementById(uniqueCardID).remove()
                    })
                    .catch(err => {
                        Swal.fire(
                            'Error!',
                            'Mitarbeiter konnte nicht gelöscht werden.',
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
                        const { data: newsImage } = await Api.put(`/members/${member.ID}`, {
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

            const { data: memberResponse } = await Api.put(`/members/${member.ID}`, {
                "name": document.getElementById(uniqueNameID).value,
                "role": document.getElementById(uniqueRoleID).value,
            })

            // if status is 200, then update the state
            if (memberResponse && error === 0) {
                setName(memberResponse.name)
                setRole(memberResponse.role)
                setImage(memberResponse.image)
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
                position: 'bottom-end',
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
                position: 'bottom-end',
                timer: 2500,
                timerProgressBar: true,
            })
        } else if (error === 2) {
            Swal.fire({
                title: 'Fehler beim Speichern',
                text: 'Text konnte nicht gespeichert werden',
                icon: 'error',
                showConfirmButton: false,
                toast: true,
                position: 'bottom-end',
                timer: 2500,
                timerProgressBar: true,
            })
        }
    }

    let edit = (
        <div className="py-3">
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

    let form = (
        <form className="">
            {/* Name input */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="name"
                        id={uniqueNameID}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue={name}
                    />
                </div>
            </div>
            {/* Role input */}
            <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">
                    Rolle
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="role"
                        id={uniqueRoleID}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue={role}
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
        </form>
    )


    if (authenticate.user) {

    } else {
        edit = null
        form = null
    }



    return (
        <div id={uniqueCardID} >
            <div
                className="space-y-4 my-4"
                style={{
                    display: showForm ? "none" : "block"
                }}
            >
                <div className="aspect-w-3 aspect-h-2">
                    <img className="object-cover shadow-lg rounded-lg" src={image} alt="" />
                </div>

                <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{name}</h3>
                        <p className="text-blue-600">{role}</p>
                    </div>

                    {edit}

                </div>
            </div>
            <div
                style={{
                    display: showForm ? "block" : "none"
                }}
            >
                {form}
            </div>
        </div>
    )
}