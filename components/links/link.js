/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, ChevronRightIcon, LinkIcon, MailIcon, TrashIcon } from '@heroicons/react/solid'
import { useAuth } from "../../contexts/auth";
import Swal from 'sweetalert2'
import Api from "../../config/api"

const applications = [
    {
        applicant: {
            name: 'Ricardo Cooper',
            email: 'ricardo.cooper@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
]

export default function Link({ link }) {
    const authenticate = useAuth()
    const uniqueLinkID = `link-${link.ID}`;

    function handleDelete() {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst es nicht zurückholen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, löschen!',
            cancelButtonText: 'Nein'
        }).then((result) => {
            if (result.value) {
                Api.delete(`/links/${link.ID}`)
                    .then(res => {
                        Swal.fire({
                            title: 'Gelöscht!',
                            text: 'Dein Link wurde gelöscht.',
                            icon: 'success',
                            showConfirmButton: false,
                            toast: true,
                            position: 'bottom-end',
                            timer: 2000,
                            timerProgressBar: true,
                        })
                        document.getElementById(uniqueLinkID).remove()
                    })
                    .catch(err => {
                        Swal.fire(
                            'Error!',
                            'Link konnte nicht gelöscht werden.',
                            'error'
                        )
                    })
            }
        })
    }

    let deleteButton = (
        <button
            onClick={handleDelete}
            type="button"
            className=" shadow-lg items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
            <TrashIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
        </button>
    )

    if (!authenticate.user) {
        deleteButton = null
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md" id={uniqueLinkID}>
            <ul role="list" className="divide-y divide-gray-200">
                <li className='relative'>
                    <a href={link.url} className="block hover:bg-gray-50" target="_blank">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0">
                                    <img className="h-24 w-24 rounded" src={link.image} alt="" />
                                </div>
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-blue-600 truncate">{link.title}</p>
                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                            <LinkIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span className="truncate">{link.url}</span>
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div>
                                            <p className="text-sm text-gray-900">
                                                {link.description}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {link.tag}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!deleteButton ?
                                <div>

                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />

                                </div>
                                :
                                null
                            }


                            {deleteButton}

                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}
