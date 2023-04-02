import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Table from "~/components/book-table/BookTable";
import { useState } from "react";

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

const SIZE = 10

const Home: NextPage = () => {
  const [page, setPage] = useState(0)
  const { data } = api.book.getPaged.useQuery({ page, size: SIZE });
  const { content, pageCount, totalCount } = data || {}

  return (
    <>
      <Head>
        <title>Booksoverhoes</title>
        <meta name="description" content="Your list of books to read" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content && (<div className="w-[80%]"><Table data={content} />
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{page + 1}-{Math.min((page + 1) * SIZE, totalCount || 0)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span></span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <div role="button" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => { page > 0 && setPage(page - 1) }}>
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              </div>
            </li>
            <li>
              <div role="button" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => { page + 1 < (pageCount || 0) && setPage(page + 1) }}>
                <span className="sr-only">Next</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" ></path></svg>
              </div>
            </li>
          </ul>
        </nav>
      </div>)}
    </>
  );
};

export default Home;