import React, { useState, useEffect } from "react";
import {Link, Outlet} from 'react-router';
// import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

    function Dashboard() {

        const [open, setOpen] = useState(false);

        const notifications = [
            {id: 1, sender: "Mw. de Wit", message: "Afspraak zometeen..", time: "2m ago"},
            {id: 2, sender: "Mr. heineken", message: "Dankjewel voor je feedback!", time: "10m ago"},
            {id: 3, sender: "mw. Slager", message: "Dat is dan afgesproken", time: "1h ago"},
        ];


        return (
            <div className="min-h-screen bg-slate-50 ">

                <div id={`container`} className="flex-column text-center">

                    <h1 className="text-4xl font-bold pb-5">welcome bij de dashboard admin !</h1>

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
                    <div id={`post`} className="border-3  bg-neutral-100 border-black-600 mx-80 p-7 mb-6">
                        <div className=" gap-3 pt-2 text-center">
                            <h2 className="text-center font-bold"> Post</h2>
                            <Link to={'/post'}
                                className="rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-500">Maak een post
                            </Link>
                        </div>
                        <form className="pt-4">
                            <label htmlFor="search">Zoeken</label>
                            <input
                                id={"search"}
                                type="text"
                                placeholder="Zoeken..."
                                className=" pl-20 pr-4 py-2 rounded-lg border border-gray-300   bg-white text-gray-900 placeholder-gray-700 "
                            />
                        </form>
                        <p>tags</p>
                        <h3 className="font-bold">resultaten:</h3>


                    </div>
                    <div id={`message`} className="border-3 bg-neutral-100 border-black-600 p-7 pt-8 mx-80 mb-6 ">
                        <h2 className="font-bold">Meldingen</h2>
                        <div className="relative inline-block text-left">
                            <button
                                onClick={() => setOpen(!open)}
                                className="p-2 m-3 rounded text-white bg-green-600 hover:bg-green-500 focus:outline-none"
                            >
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
                        <p className="border-2 border-green-600 text-white bg-green-600"> hier is een melding</p>
                    </div>

                </div>

            </div>


        )
    };

export default Dashboard;