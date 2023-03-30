import React from 'react'
import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: sessionData } = useSession();

    if (!sessionData?.user) {
        return null
    }

    return (
        <FlowbiteNavbar
            fluid={true}
            className='min-w-full'
        >
            <FlowbiteNavbar.Brand href="https://flowbite.com/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Booksoverhoes
                </span>
            </FlowbiteNavbar.Brand>
            <FlowbiteNavbar.Toggle />
            <FlowbiteNavbar.Collapse>
                {sessionData?.user &&
                    <FlowbiteNavbar.Link href="/login" onClick={() => void signOut()}>
                        Logout
                    </FlowbiteNavbar.Link>
                }
            </FlowbiteNavbar.Collapse>
        </FlowbiteNavbar>
    )
}

export default Navbar