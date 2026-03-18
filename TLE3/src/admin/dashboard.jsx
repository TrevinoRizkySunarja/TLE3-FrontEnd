import React, { useState, useEffect } from "react";
import {Link, Outlet, useParams} from 'react-router';
// import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer.jsx";
import {Inbox} from "lucide-react";
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
import Navbar from "../components/Navbar.jsx";
import {useLocation} from "react-router-dom";

    function Dashboard() {

        const location = useLocation();
        const user = location.state?.user;

        const notifications = [
            {id: 1, sender: "Mw. de Wit", message: "Afspraak zometeen..", time: "2m ago"},
            {id: 2, sender: "Mr. heineken", message: "Dankjewel voor je feedback!", time: "10m ago"},
            {id: 3, sender: "mw. Slager", message: "Dat is dan afgesproken", time: "1h ago"},
        ];

        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar/>

                <main>
                    <div
                        id="container"
                        className="mx-auto w-full max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8"
                    >
                        <h1 className="pb-6 text-2xl font-bold sm:text-3xl lg:text-4xl">
                            welkom bij de dashboard {user?.first_name} {user?.last_name} !
                        </h1>

                        <div
                            className="mx-auto mb-6 w-full max-w-3xl rounded-md border-2 border-black bg-neutral-100 p-5 text-center sm:p-6 lg:p-7">
                            <h2 className="border-b-2 border-black pb-2 font-bold">Agenda</h2>

                            <h3 className="mt-4 font-bold">Tijd</h3>
                            <p>09:00 - 12:00</p>

                            <div className="mt-4">
                                <h3 className="font-bold">Onderwerp</h3>
                                <p>Job coach gesprek Dhr. Maas</p>

                                <h3 className="mt-3 font-bold">Locatie</h3>
                                <div className="mt-2 space-y-1">
                                    <p>Rivierweg 111, 2903 AR Capelle aan den IJssel</p>
                                    <p>2e etage kamer 100</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="mx-auto mb-6 w-full max-w-3xl rounded-md border-2 border-black bg-neutral-100 p-5 sm:p-6 lg:p-7">
                            <div className="mx-auto max-w-2xl">
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <h2 className="text-xl font-bold text-black sm:text-2xl">Post</h2>

                                    <Link
                                        to="/post"
                                        className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-neutral-100"
                                    >
                                        Maak een post
                                    </Link>
                                </div>

                                <form className="mt-8" role="search">
                                    <div className="mx-auto w-full max-w-lg text-left">
                                        <label
                                            htmlFor="search"
                                            className="mb-2 block text-base font-medium text-black"
                                        >
                                            Zoeken
                                        </label>

                                        <input
                                            id="search"
                                            name="search"
                                            type="text"
                                            placeholder="Zoeken..."
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </form>

                                <div className="mt-8 space-y-3 text-center">
                                    <p className="text-base text-black">tags</p>
                                    <h3 className="text-lg font-bold text-black">Resultaten</h3>
                                </div>
                            </div>
                        </div>

                        <div
                            className="mx-auto mb-6 w-full max-w-3xl rounded-md border-2 border-black bg-neutral-100 p-5 text-center sm:p-6 lg:p-7">
                            <h2 className="font-bold">Meldingen</h2>

                            <div className="relative mt-4 inline-block text-left">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-neutral-100"
                                >
                                    3 Mededelingen
                                </button>

                                {open && (
                                    <div
                                        className="absolute right-0 z-10 mt-2 w-64 rounded-lg bg-white text-left shadow-lg ring-1 ring-black ring-opacity-5 sm:w-72">
                                        <div className="border-b p-4 font-semibold">Meldingen</div>

                                        <ul className="max-h-60 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((n) => (
                                                    <li
                                                        key={n.id}
                                                        className="cursor-pointer px-4 py-3 hover:bg-gray-50"
                                                    >
                                                        <p className="text-sm font-medium">{n.sender}</p>
                                                        <p className="text-xs text-gray-500">{n.message}</p>
                                                        <span className="text-xs text-gray-400">{n.time}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-3 text-sm text-gray-500">
                                                    Geen Meldingen
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer/>
            </div>
        )
    };

export default Dashboard;