/* This example requires Tailwind CSS v2.0+ */
export default function HeaderSection(props) {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-blue-500 tracking-wide uppercase">{props.theme}</h2>
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        {props.title}
                    </p>
                    <p className="max-w-xl mx-auto text-xl text-gray-500">
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
