import { SpeakerphoneIcon, XIcon } from '@heroicons/react/solid'
import React, { useState } from "react"
import Api from "../../config/api"
import { useAuth } from "../../contexts/auth"
import ServiceCard from './ServiceCard'

function Service({ services }) {
    const authenticated = useAuth()
    const [show, setShow] = useState(false)
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
        if (authenticated.user) {
            return (
                <div className="">
                    {heading}
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                    
                        {services.map((service) => (
                            <div className="flex p-3 items-center justify-center bg-white" key={service.ID}>

                                
                                <ServiceCard service={service} />
                                
                          
                            </div>

                        ))}
                        
                    </div>
                </div>
            )
        } else {
            return (
                <div className="">
                    {heading}
                    <div className="grid sm:grid-cols-3 gap-4">
                    
                        {services.map((service) => (
                            <div className="flex p-3 items-center justify-center bg-white" key={service.ID}>

                                <div className="w-80 rounded-2xl border shadow py-12 px-8 hover:-translate-y-1 hover:shadow-2xl delay-75 duration-100">
                            
                                    <p className="text-3xl text-gray-700 font-semibold"> {service.title} </p>
                                    <p className="text-sm text-gray-700 font-light mt-2 leading-7"> {service.content} </p>
                                    <div className="">
                                        <img src={service.picture} />
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