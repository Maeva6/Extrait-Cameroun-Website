import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    // Vérifier si l'utilisateur est défini
    const user = auth?.user;

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl px-6 lg:max-w-7xl">
                    <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                        <div className="flex lg:col-start-2 lg:justify-center">
                            <svg
                                className="h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]"
                                viewBox="0 0 62 65"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >@vite('resources/js/app.jsx')
                                <path
                                    d="M61.8548 14.6253C61.8778 14.7102 61.8895..."
                                    fill="currentColor"
                                />
                            </svg>
                        </div>

                        {/* Gestion des liens d'authentification */}
                        <nav className="-mx-3 flex flex-1 justify-end">
                            {user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Message de bienvenue */}
                    <div className="text-center mt-6">
                        {user ? (
                            <h1 className="text-xl font-bold">Bienvenue, {user.name} !</h1>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">Veuillez vous connecter ou vous inscrire.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
