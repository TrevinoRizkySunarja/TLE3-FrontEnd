import React, { useState, useEffect } from "react";
import {Link, Outlet, useParams} from 'react-router';
// import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer.jsx";
import {Inbox} from "lucide-react";

    function Dashboard() {

        const adminId = localStorage.getItem("authUser");
        const [open, setOpen] = useState(false);


        const savedAdmin = JSON.parse(localStorage.getItem("authUser"));

        const [admin, setAdmin] = useState({
            first_name: savedAdmin?.first_name || "",
            last_name: savedAdmin?.last_name || "",
            email: savedAdmin?.email || "",
        });

        console.log(adminId.first_name)

        const notifications = [
            {id: 1, sender: "Mw. de Wit", message: "Afspraak zometeen..", time: "2m ago"},
            {id: 2, sender: "Mr. heineken", message: "Dankjewel voor je feedback!", time: "10m ago"},
            {id: 3, sender: "mw. Slager", message: "Dat is dan afgesproken", time: "1h ago"},
        ];

        console.log(adminId)

        return (
            <div className="min-h-screen bg-slate-50 ">
<main>
    <div id={`container`} className="flex-column text-center mx-auto">

        <h1 className="text-4xl font-bold pb-5">welcome bij de dashboard {admin.first_name} {admin.last_name} !</h1>

        <div id={`agenda`} className="border-3 bg-neutral-100 mx-80 border-black-600 p-7 mb-6  ">
            <h2 className="font-bold border-b-2 border-black-600 ">Agenda</h2>
            <h3 className="font-bold">Tijd</h3>
            <p>09:00 - 12:00</p>

            <div>
                <h3 className="font-bold">Onderwerp</h3>
                <p> Job coach gesprek Dhr. Maas </p>
                <h3 className="font-bold">Locatie:</h3>
            </div>

            <div className=" gap-2 text-center">
                <p>Rivierweg 111, 2903 AR Capelle aan den IJssel</p>
                <p>2e etage kamer 100</p>
            </div>
        </div>

        <div
            id="post"
            className="mx-80 mb-6 border-3 border-black bg-neutral-100 p-8"
        >
            <div className="mx-auto max-w-2xl">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-2xl font-bold text-black">Post</h2>

                    <Link
                        to="/post"
                        className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-neutral-100"
                    >
                        Maak een post
                    </Link>
                </div>

                <form className="mt-8" role="search">
                    <div className="mx-auto max-w-xl">
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

                <div className="mt-8 space-y-4 text-center">
                    <p className="text-base text-black">tags</p>
                    <h3 className="text-lg font-bold text-black">Resultaten</h3>
                </div>
            </div>
        </div>

        <div id={`message`} className="border-3 bg-neutral-100 border-black-600 p-7 pt-8 mx-80 mb-6 ">
            <h2 className="font-bold">Meldingen</h2>
            <div className="relative inline-block text-left">
                <button onClick={() => setOpen(!open)}
                        className="p-2 m-3 rounded text-white bg-green-600 hover:bg-green-500 focus:outline-none">
                    3 Mededelingen
                    {/*<BellIcon className="h-6 w-6 text-gray-600"/>*/}
                </button>

                {open && (
                    <div
                        className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="p-4 border-b font-semibold">Meldingen</div>
                        <ul className="max-h-60 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((n) => (
                                    <li
                                        key={n.id}
                                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <p className="text-sm font-medium">{n.sender}</p>
                                        <p className="text-xs text-gray-500">{n.message}</p>
                                        <span className="text-xs text-gray-400">{n.time}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-3 text-sm text-gray-500">Geen Meldingen</li>
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