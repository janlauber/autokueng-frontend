import MemberCard from "./MemberCard";
import { useAuth } from "../../contexts/auth";
import React, { useState } from "react";
import { SpeakerphoneIcon, ViewGridAddIcon, XCircleIcon, PhotographIcon, SaveIcon, UserAddIcon } from '@heroicons/react/solid';
import Api from "../../config/api"
import DataApi from '../../config/data-api'
import Swal from 'sweetalert2'

export default function Team({ members }) {
  const authenticate = useAuth()
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log()

    const error = 0;

    const formDataText = new FormData()
    const formDataImage = new FormData()
    formDataText.append("name", document.querySelector("#name").value)
    formDataText.append("role", document.querySelector("#role").value)
    formDataText.append("quote", document.querySelector("#quote").value)
    formDataImage.append("image", document.querySelector("#image").files[0])

    try {
      const { data: memberImageUpload } = await DataApi.post('/upload', formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (memberImageUpload) {
        try {
          const { data: memberUpload } = await Api.post(`/members`, {
            "name": document.querySelector("#name").value,
            "role": document.querySelector("#role").value,
            "image": memberImageUpload.data.imageUrl,
          });
          if (memberUpload) {
            // add member to state
            members.push(memberUpload)
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
        text: 'Member konnte nicht hochgeladen werden',
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
    document.getElementById("member-form").reset();
    document.getElementById("image-preview").src = "";
    document.getElementById("image-preview").style.display = "none";
  }

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
        Member hinzufügen
      </button>
    </div>
  )

  let form = (
    <div
      style={{
        display: showForm ? "block" : "none"
      }}
      className="flex lg:mx-80 lg:border lg:rounded-xl lg:shadow-md bg-gray-50 lg:my-10"
    >
      <div className="py-10 px-8">
        <h2 className="text-xl text-blue-500 font-semibold">Member hinzufügen</h2>

        <form id="member-form" onSubmit={handleSubmit}>
          {/* Name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
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
                id="role"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          {/* Quote input */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Zitat
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="quote"
                id="quote"
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
    <div className="bg-white">
      <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8 ">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Das Team</h2>
            <p className="text-xl text-gray-500">
              Hochqualifizierte Mitarbeitende mit langjähriger Erfahrung und Expertise.
            </p>
            {addButton}
          </div>

          {form}
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {members.map((member) => (
              <li key={member.ID}>
                <MemberCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}