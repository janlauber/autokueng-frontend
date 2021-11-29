import { faCar, faTools, faShoppingCart, faFan, faVolumeUp, faStethoscope, faCogs, faRoad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const services = [
    {
        icon: faShoppingCart,
        title: 'Verkauf',
        description: 'Wir verkaufen Ihnen Neuwagen sowie Occasion Modelle',
    },
    {
        icon: faTools,
        title: 'Reparaturen',
        description: 'Servicearbeiten und Reparaturen aller Marken',
    },
    {
        icon: faCar,
        title: 'Karosserie Arbeiten',
        description: 'Karosseriearbeiten aller Art für jegliche Fahrzeuge',
    },
    {
        icon: faCogs,
        title: 'Ersatzteile / Accessoires',
        description: 'Wir ersetzen jegliche defekte Teile Ihres Fahrzeug',
    },
    {
        icon: faFan,
        title: 'Klimawartung',
        description: 'Alles rund um die Klimaanlage im Fahrzeug',
    },
    {
        icon: faVolumeUp,
        title: 'Radio',
        description: 'Der Sound im Fahrzeug muss natürlich auch stimmen',
    },
    {
        icon: faStethoscope,
        title: 'Car Diagnostic',
        description: 'Damit bei Ihrem Problem die richtige Diagnose erzielt wird',
    },
    {
        icon: faRoad,
        title: 'Service rund ums Rad',
        description: 'Mehr Sicherheit und Zuverlässigkeit auf der Strasse',
    },
]

const Services = () => {
    return (
        <div className="bg-blue-500 py-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
                UNSERE SERVICES
            </h2>
            <div className="text-white flow-root mt-8 lg:mt-10">
                <div className="grid grid-rows-4 md:grid-rows-2 grid-flow-col gap-4 ">
                    {services.map((services) => (
                        <div className="text-lg text-center" key="{service.title}">
                            <div className="text my-5">
                                <FontAwesomeIcon icon={services.icon} className="fa-5x" />
                            </div>
                            <h3 className="font-bold" >{services.title}</h3>
                            <p className="text-gray-300 italic text-sm">{services.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Services