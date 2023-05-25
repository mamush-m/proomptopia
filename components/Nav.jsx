"use client"

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const isUserLoggedIn = true;

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

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
        <div className="sm:flex hidden bg-purple-300">
            {
                isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href='/create-prompts' className="black_btn">Create Post</Link>

                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>

                        <Link href='/profile'>
                            <Image
                                src='/assets/images/logo.svg'
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
                isUserLoggedIn ? (
                    <div className="flex">
                        <Image
                                src='/assets/images/logo.svg'
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profilesssss"
                                onClick={() => setToggleDropdown(!toggleDropdown)}
                            />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link 
                                    href='/profile'
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>    
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