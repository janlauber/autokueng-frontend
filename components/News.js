import Image from 'next/image'

function News({ data }) {
    return (


  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
        NEWS
    </h1>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div className="max-w-md mx-auto">
        <div>
          <img src={data.url} className="h-7 sm:h-8" />
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8  leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                <span className="block text-blue-500">{data.title}</span>
            </h1>
            {/* <ul className="list-disc space-y-2">
              <li className="flex items-start">
                <span className="h-6 flex items-center sm:h-7">
                  <svg className="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p className="ml-2">
                  Customizing your
                  <code className="text-sm font-bold text-gray-900">tailwind.config.js</code> file
                </p>
              </li>
            </ul> */}
            <p>{data.url}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
      )
}

export default News