"use client"

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const {data: session} = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    const disableToggle = () => {
        setToggleDropdown(false);
    }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href='/' className="flex gap-2 flex-center">
            <Image 
                src='/assets/images/logo.svg'
                alt="Proomptopia Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">Proomptopia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden hover:bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 transition duration-500 px-1 py-3 rounded-full">
            {
                session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href='/create-prompt' className="black_btn">Create Post</Link>

                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>

                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            >

                            </Image>
                        </Link>
                    </div>
                ) : (<>
                    {providers && Object.values(providers).map(provider => {
                        return (<button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In
                        </button>)
                    })}
                </>)
            }
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative sm:bg-yellow-300 sm:p-10">
            {
                session?.user ? (
                    <div className="flex">
                        <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full cursor-pointer"
                                alt="profile"
                                onClick={() => setToggleDropdown(prev => !prev)}
                            />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link 
                                    href='/profile'
                                    className="dropdown_link"
                                    onClick={disableToggle}
                                >
                                    My Profile
                                </Link>

                                <Link 
                                    href='/create-prompt'
                                    className="dropdown_link"
                                    onClick={disableToggle}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        disableToggle();
                                        signOut(); }}
                                    className="mt-5 w-full black_btn">
                                        Sign Out
                                </button>
                            </div>
                            
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map(provider => {
                        return (<button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In
                        </button>)
                    })}
                    </>
                )
            }
        </div>
    </nav>
  )
}

export default Nav

// {providers && Object.values(providers).map(provider => {
//     return (<button
//         type="button"
//         key={provider.name}
//         onClick={() => signIn(provider.id)}
//         className="black_btn"
//     >
//         Sign In
//     </button>)
// })}