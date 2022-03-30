/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, LoginIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useAuth } from '../contexts/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar(props) {
  const authenticate = useAuth()
  const router = useRouter()
  let loginStatus
  let responsiveShowUser
  let showUser = (
    <Link href="/login">
      <button
        type="button"
        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <LoginIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </Link>
  )

  if (authenticate.user) {
    loginStatus = ("Log out")
    showUser = (
      <div>
        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="/images/avatars/admin.png"
            alt=""
          />
        </Menu.Button>
      </div>
    )
    responsiveShowUser = (
      <div className="pt-4 flex items-center px-4">
          <div className="flex-shrink-0">
            <img
            className="h-10 w-10 rounded-full ring-blue-500 ring-2"
            src="/images/avatars/admin.png"
            alt=""
          />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium text-gray-800">{authenticate.user["username"]}</div>
        </div>
      </div>
    )
  } else {
    loginStatus = ("Log in")
  }

  const changeLoginStatus = () => {
    if (authenticate.user) {
      authenticate.logout()
      router.push('/')
    } else {
      router.push('/login')
    }
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">

      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                    <Link href="/">
                      <img
                        className="block lg:hidden h-8 w-auto cursor-pointer"
                        src="/images/logo/logo_text_colored_primary.svg"
                        alt="Workflow"
                      />
                    </Link>
                    <Link href="/">
                      <img
                        className="hidden lg:block h-8 w-auto cursor-pointer"
                        src="/images/logo/logo_text_colored_primary.svg"
                        alt="Workflow"
                      />
                    </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link href="/">
                    <span className="cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Home
                    </span>
                  </Link>
                  <Link href="/fahrzeugpark">
                    <span className="cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Fahrzeugpark
                    </span>
                  </Link>
                  <Link href="/services">
                    <span className="cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Services
                    </span>
                  </Link>
                  <Link href="/firma">
                    <span className="cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Firma
                    </span>
                  </Link>
                  <Link href="/links">
                    <span className="cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Links
                    </span>
                  </Link>
                  <Link href="/kontakt">
                    <span className="cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Kontakt
                    </span>
                  </Link>
                </div>
              </div>


              <div className="hidden z-10 sm:ml-6 sm:my-auto sm:block">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {showUser}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="cursor-pointer origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => { changeLoginStatus() }}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            {loginStatus}
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-blue-50 border-blue-500 text-blue-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/fahrzeugpark"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Fahrzeugpark
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/services"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Services
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/firma"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Firma
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/links"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Links
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/kontakt"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Kontakt
              </Disclosure.Button>
            </div>

            <div className="pt-0 pb-3 border-t border-gray-200">
              {responsiveShowUser}
              <div className="mt-3 space-y-1">
                <span
                  className='cursor-pointer'
                  onClick={changeLoginStatus}
                >
                  <Disclosure.Button
                    as="a"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
                  >
                    {loginStatus}
                  </Disclosure.Button>
                </span>
              </div>
            </div>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar