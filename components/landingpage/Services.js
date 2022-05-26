import { faCar, faTools, faShoppingCart, faFan, faVolumeUp, faStethoscope, faCogs, faRoad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const services = [
    {
        id: 1,
        icon: faShoppingCart,
        title: 'Verkauf',
        description: 'Wir verkaufen Ihnen Neuwagen sowie Occasion Modelle',
    },
    {
        id: 2,
        icon: faTools,
        title: 'Reparaturen',
        description: 'Servicearbeiten und Reparaturen aller Marken',
    },
    {
        id: 3,
        icon: faCar,
        title: 'Karosserie Arbeiten',
        description: 'Karosseriearbeiten aller Art für jegliche Fahrzeuge',
    },
    {
        id: 4,
        icon: faCogs,
        title: 'Ersatzteile / Accessoires',
        description: 'Wir ersetzen jegliche defekte Teile Ihres Fahrzeug',
    },
    {
        id: 5,
        icon: faFan,
        title: 'Klimawartung',
        description: 'Alles rund um die Klimaanlage im Fahrzeug',
    },
    {
        id: 6,
        icon: faVolumeUp,
        title: 'Radio',
        description: 'Der Sound im Fahrzeug muss natürlich auch stimmen',
    },
    {
        id: 7,
        icon: faStethoscope,
        title: 'Car Diagnostic',
        description: 'Damit bei Ihrem Problem die richtige Diagnose erzielt wird',
    },
    {
        id: 8,
        icon: faRoad,
        title: 'Service rund ums Rad',
        description: 'Mehr Sicherheit und Zuverlässigkeit auf der Strasse',
    },
]

const Services = () => {
    return (
        <div className="bg-gray-50 pt-10">
            <h2 className="text-3xl text-center font-extrabold text-gray-900 sm:text-4xl">
                UNSERE SERVICES
            </h2>
            <div className="text-blue-500 flow-root mt-8 lg:mt-10">
                <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {services.map((services) => (
                        <div className="block cursor-default select-none sm:hover:scale-105 hover:active:scale-105 transition-all duration-150 ease-in-out py-4 px-10 bg-white rounded-lg shadow-lg text-lg text-center" key={services.id}>
                            <div className="text">
                                <FontAwesomeIcon icon={services.icon} className="fa-3x mb-2" />
                            </div>
                            <h3 className="font-bold text-gray-700" >{services.title}</h3>
                            <p className="text-gray-700 text-sm">{services.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services