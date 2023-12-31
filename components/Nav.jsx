"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  
  const {data: session} = useSession();
  const [providers, setProviders] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const getAllProviders = async () => {
        const response = await getProviders();
        setProviders(response);
    }
    getAllProviders();
  }, []);

  return (
    <nav className="flex-between pt-3 pb-3 mb-16 w-full">
      <Link href="/" className="flex-between gap-2">
        <Image src="/assets/images/logo.svg" width={30} height={30} alt="logo" />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {
            session?.user ? (
            <div className="flex gap-3 md:gap-5">
                <Link 
                    href="/create-prompt" 
                    className="black_btn"
                >
                    Create Prompt
                </Link>

                <button 
                    type="button"
                    className="outline_btn"
                    onClick={() => signOut()}
                >
                    Sign Out
                </button>
                <Link 
                    href="/profile" 
                >
                    <Image 
                        src={session?.user.image} 
                        width={35} 
                        height={35} 
                        alt="profile" 
                        className="rounded-full"
                    />
                </Link>

            </div>
            ) : (
            <div className="flex gap-3 md:gap-5">
                { providers && Object.values(providers).map(
                    (provider) => (
                        <button 
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In
                        </button>
                    )
                )}
            </div>
            )
        }
      </div>

      <div className="sm:hidden flex relative">

        { session?.user ? (
            <div className="flex">
                <Image 
                    src={session?.user.image}
                    width={35}
                    height={35}
                    className="rounded-full"
                    alt="profile"
                    onClick={() => setToggleDropDown(prev => !prev)}
                />
                {
                    toggleDropDown && 

                    <div className="dropdown">
                        <Link
                            href="/profile"
                            className="dropdown_link"
                            onClick={() => setToggleDropDown(false)}
                            > 
                            My Profile
                        </Link>
                        <Link
                            href="/create-prompt"
                            className="dropdown_link"
                            onClick={() => setToggleDropDown(false)}
                            > 
                            Create Prompt
                        </Link>
                        <button
                            type="button"
                            className="mt-5 black_btn w-full"
                            onClick={() => {
                                setToggleDropDown(false);
                                signOut();
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                }
            </div>
        ) : (
            <div className="flex flex-col">
                { providers && Object.values(providers).map(
                    (provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In
                        </button>
                    )
                )}
            </div>
        )}

      </div>

    </nav>
  );
};

export default Nav;
