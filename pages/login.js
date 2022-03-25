import { useRouter } from 'next/router';
import { useEffect } from 'react/cjs/react.production.min';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/auth';

export default function Login() {
    const authenticate = useAuth();
    const router = useRouter();
    const submit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');

        try {
            await authenticate.login(username, password);
            router.push('/');
        } catch (error) {
            Swal.fire({
                title: 'Fehler',
                text: "Benutzername oder Passwort falsch",
                icon: 'error',
                toast: true,
                position: 'top-start',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });

            // color red for the input field
            const usernameInput = document.getElementById('username');
            usernameInput.style.borderColor = 'red';

            const passwordInput = document.getElementById('password');
            passwordInput.style.borderColor = 'red';
        }
    }

    if (authenticate.user) {
        router.push('/');
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