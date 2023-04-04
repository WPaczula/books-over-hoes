import { type Book } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import React from 'react'
import { type BookStatus } from '~/types/BookStatus'
import { api } from '~/utils/api'
import BookStatusBadge from '../book-status-badge/BookStatusBadge'
import Datepicker from '../datepicker/Datepicker'

type Props = {
    data: Array<Book>
}

const Table = ({ data }: Props) => {
    const queryClient = useQueryClient()
    const adjustNeedsReviewMutation = api.book.adjustNeedsReview.useMutation({
        onSettled: async () => {
            const getBooksQueryKey = getQueryKey(api.book.getPaged)
            await queryClient.refetchQueries({ queryKey: getBooksQueryKey })
        }
    })
    const handleChangeNeedsReview = (bookId: string, needsReview: boolean) => {
        adjustNeedsReviewMutation.mutate({ id: bookId, needsReview })
    }

    const adjustHasAudiobookMutation = api.book.adjustHasAudiobook.useMutation({
        onSettled: async () => {
            const getBooksQueryKey = getQueryKey(api.book.getPaged)
            await queryClient.refetchQueries({ queryKey: getBooksQueryKey })
        }
    })
    const handleChangeHasAudiobook = (bookId: string, hasAudiobook: boolean) => {
        adjustHasAudiobookMutation.mutate({ id: bookId, hasAudiobook })
    }

    const adjustReadAtMutation = api.book.adjustReadAt.useMutation({
        onSettled: async () => {
            const getBooksQueryKey = getQueryKey(api.book.getPaged)
            await queryClient.refetchQueries({ queryKey: getBooksQueryKey })
        }
    })
    const handleChangeReadAt = (bookId: string, readAt: Date | null) => {
        adjustReadAtMutation.mutate({ id: bookId, readAt })
    }

    const adjustPostedMutation = api.book.adjustPosted.useMutation({
        onSettled: async () => {
            const getBooksQueryKey = getQueryKey(api.book.getPaged)
            await queryClient.refetchQueries({ queryKey: getBooksQueryKey })
        }
    })
    const handleChangePosted = (bookId: string, posted: boolean) => {
        adjustPostedMutation.mutate({ id: bookId, posted })
    }

    const adjustHasReviewMutation = api.book.adjustHasReview.useMutation({
        onSettled: async () => {
            const getBooksQueryKey = getQueryKey(api.book.getPaged)
            await queryClient.refetchQueries({ queryKey: getBooksQueryKey })
        }
    })
    const handleChangeHasReview = (bookId: string, hasReview: boolean) => {
        adjustHasReviewMutation.mutate({ id: bookId, hasReview })
    }

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className='grid grid-cols-[140px_2fr_200px_1fr_100px_100px_80px] items-center'>
                    <th scope="col" className="px-6 py-3">
                        Needs review
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3 w-[200px]">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Read
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Reviewed
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Posted
                    </th>
                    <th scope="col" className="px-6 py-3">
                        🎧
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map(book => (
                    <>
                        <tr key={book.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 grid grid-cols-[140px_2fr_200px_1fr_100px_100px_80px] items-center">
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={(event) => {
                                            handleChangeNeedsReview(book.id, event.target.checked)
                                        }}
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        checked={book.needsReview}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">Needs review</label>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {book.name}
                            </td>
                            <td className="px-6 py-4 w-[200px]">
                                <BookStatusBadge status={book.status as BookStatus} />
                            </td>
                            <td className="px-6 py-4 w-[300px] flex gap-3 items-center min-h-[80px]">
                                <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    checked={!!book.readAt}
                                    onChange={(event) => {
                                        handleChangeReadAt(book.id, event.target.checked ? new Date() : null)
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                {book.readAt && <Datepicker value={book.readAt} onChange={(date) => handleChangeReadAt(book.id, date)} />}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        disabled={!book.readAt || !book.needsReview}
                                        checked={book.hasReview}
                                        onChange={(event) => {
                                            handleChangeHasReview(book.id, event.target.checked)
                                        }}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  disabled:opacity-20 disabled:cursor-not-allowed"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">Has review</label>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <input
                                        disabled={!book.readAt || book.needsReview && !book.hasReview}
                                        onChange={(event) => {
                                            handleChangePosted(book.id, event.target.checked)
                                        }}
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        checked={book.posted}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-20 disabled:cursor-not-allowed"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">Needs review</label>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        checked={book.hasAudioBook}
                                        onChange={(event) => {
                                            handleChangeHasAudiobook(book.id, event.target.checked)
                                        }}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">Has audiobook</label>
                                </div>
                            </td>
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    )
}

export default Table