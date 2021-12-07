import Image from 'next/image'
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/solid'
import React, { useState } from "react"
import { Popover, Transition } from '@headlessui/react'




function Services({ services }) {
    const [show, setShow] = useState(false);
    function closeAlert() {
        setShow(!show);
    }
    let heading = (
        <div className="my-6 text-center">
            <h1 className="my-2 font-bold text-4xl">SERVICES</h1>
            <h2 className="text-xl text-blue-600 font-semibold">Unsere Dienstleistungen im Überblick</h2>
        </div>     
    )
    try {
        return (
            <div className="">
                {heading}
                <div className="grid sm:grid-cols-3 gap-4 ">
                
                    {services.map((service) => (
                        
                        <div className="text-lg text-center p-8" key={service.id}>
                            <div className="">
                                <img src="https://via.placeholder.com/600/92c952" />
                            </div>
                            <h2 className="font-bold text-4xl">{service.title}</h2>
                            <p className="text-gray-800 italic text-sm">{service.body}</p>
                        </div>
                    ))}
                

                </div>
                
            </div>
        )
    } catch (error) {
        console.log("No Services found")
        return (
            <div className="">
                {heading}
                    <div 
                        style={{
                            display: show ? "none" : "block"
                          }}
                        className="fixed inset-x-0 pb-2 sm:pb-5"
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

export default Services