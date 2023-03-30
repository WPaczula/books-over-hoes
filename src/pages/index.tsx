import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Table from "~/components/book-table/BookTable";

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
    props: {}
  }
}

const Home: NextPage = () => {
  const { data: session } = useSession()
  const { data: books } = api.book.getPaged.useQuery({ page: 0, size: 10 });

  return (
    <>
      <Head>
        <title>Booksoverhoes</title>
        <meta name="description" content="Your list of books to read" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {books && <Table data={books} />}
    </>
  );
};

export default Home;