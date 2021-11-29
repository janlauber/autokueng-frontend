import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/solid'
const About = () => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
                        Das Wichtigste
                    </h2>
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl uppercase">
                        Über uns
                    </p>
                    <div className="text-left">
                    <div>
                        <div className="mt-5 border-t border-gray-200">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-bold text-gray-700">Gründung</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">1981</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-bold text-gray-700">Dienstleistungen</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Reparaturen, Services, Waschen, Verkauf, Karosserie Arbeiten, Klimawartung, Service rund ums Rad, Car Diagnostic, Ersatzteile / Accessoires, usw...</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-bold text-gray-700">Fahrzeuge</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">jegliche Marken</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-bold text-gray-700">E-Mail</dt>
                                    <dd className="font-semibold mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><a href="mailto:info@autokueng.ch"className="hover:text-gray-700"><MailIcon className="h-5 w-5 text-blue-500 inline" /> info@autokueng.ch</a></dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-bold text-gray-700">Telefon</dt>
                                    <dd className="font-semibold mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><a href="tel:+41319585757" className="hover:text-gray-700"><PhoneIcon className="h-5 w-5 text-blue-500 inline" /> 031 958 57 57</a></dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-bold text-gray-700">Adresse</dt>
                                    <dd className="font-semibold mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><a href="https://goo.gl/maps/BtkyVfsMK8YYGBHD9" target="_blank" className="hover:text-gray-700"><LocationMarkerIcon className="h-5 w-5 text-blue-500 inline" />Thunstrasse 16, 3112 Allmendingen</a></dd>
                                </div>
                            </dl>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About