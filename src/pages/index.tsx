import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

const Home: NextPage = () => {
  const { data: session } = useSession()
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Booksoverhoes</title>
        <meta name="description" content="Your list of books to read" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Hello {session?.user.name} 👋</h1>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};
