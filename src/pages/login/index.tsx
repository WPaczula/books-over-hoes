import { type GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import React from 'react'
import Button from '~/components/button/Button'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {}
    }
}

const Login = () => {
    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-[300px]">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Login</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-8">Welcome 👋 Log in to see your books!</p>
            <Button onClick={() => void signIn()} className={'w-full'}>Login</Button>
        </div>
    )
}

export default Login