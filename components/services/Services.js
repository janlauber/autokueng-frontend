import Image from 'next/image'

function Services({ services }) {
    return (
        <>
        <div className="">
            <div className="my-6 text-center">
				<h1 className="my-2 font-bold text-4xl">Services</h1>
				<h2 className="text-xl text-blue-600 font-semibold">Unsere Dienstleistungen im Überblick</h2>
			</div>
            <div className="grid sm:grid-cols-3 gap-4 ">

            {services.map((service) => (
                
                <div className="text-lg text-center p-8" key="{service.title}">
                    <div className="">
                        <img src="https://via.placeholder.com/600/92c952" />
                    </div>
                    <h2 className="font-bold text-4xl">{service.title}</h2>
                    <p className="text-gray-800 italic text-sm">{service.body}</p>
                </div>
            ))}

            </div>
            
        </div>
        </>
      )
}

export default Services