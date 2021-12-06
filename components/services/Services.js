import Image from 'next/image'

function Services({ services }) {
    return (
        <>
        <div className="pt-10">
            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Services
            </h1>
            <div className="grid sm:grid-cols-3 gap-4 ">

            {services.map((service) => (
                
                <div className="text-lg text-center p-8" key="{service.title}">
                    <div className="">
                        <img src="https://via.placeholder.com/600/92c952" />
                    </div>
                    <h2 className="font-bold text-xl">{service.title}</h2>
                    <p className="text-gray-800 italic text-sm">{service.body}</p>
                </div>
            ))}

            </div>
            
        </div>
        </>
      )
}

export default Services