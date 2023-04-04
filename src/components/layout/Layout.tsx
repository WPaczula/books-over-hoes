import React from 'react'
import Navbar from '../navbar/Navbar'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main className='flex flex-col bg-slate-100 dark:bg-slate-900 min-h-screen h-full justify-center items-center min-w-full'>
                {children}
            </main>
        </>
    )
}

export default Layout