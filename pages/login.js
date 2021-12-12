import { useRouter } from 'next/router'
import { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const submit = async (e) => {
        e.preventDefault();
        
        try {
            const data = await fetch('http://localhost:8000/api/v1/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        username,
                        password
                    }
                )})

            if (data.status === 200) {
                props.updateState()
                router.push('/')
            } else {
                Swal.fire({
                    title: 'Fehler',
                    text: 'Benutzername oder Passwort falsch',
                    icon: 'error',
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                  })
            }
        } catch (error) {
            Swal.fire({
                title: 'Fehler',
                text: 'Es ist ein Fehler aufgetreten',
                icon: 'error',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              })
        }
    }

    return (
        <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="/images/logo/logo_colored_primary.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Backend Login</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Verwalte{' '}
                    <span className="font-medium text-blue-500 hover:text-blue-600">
                    diverse Inhalte dieser Webseite
                    </span>
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                type="text"
                                name="username"
                                id="username"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-600 sm:text-sm"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                type="password"
                                name="password"
                                id="password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-600 sm:text-sm"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                            </div>
                        </div>
                        <div>
                            <button 
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;