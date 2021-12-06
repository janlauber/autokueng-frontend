import Image from 'next/image'

function News({ data }) {
    return (
      <div className="py-3 pt-10 sm:max-w-xl sm:mx-auto">
        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
            NEWS
        </h1>
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <img src={data.url} className="h-7 sm:h-8" />
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8  leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                    <span className="block text-blue-500">{data.title}</span>
                </h1>
                <p>{data.url}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
}

export default News