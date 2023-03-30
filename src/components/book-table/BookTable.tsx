import { type Book } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import React from 'react'
import { type BookStatus } from '~/types/BookStatus'
import { api } from '~/utils/api'
import BookStatusBadge from '../book-status-badge/BookStatusBadge'

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

    return (
        <div className="relative overflow-x-auto w-[85%]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Needs review
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Read at
                        </th>
                        <th scope="col" className="px-6 py-3 w-[200px]">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            🎧
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(book => (
                        <tr key={book.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                            <td className="px-6 py-4">
                                {book.readAt?.toDateString() || '-'}
                            </td>
                            <td className="px-6 py-4 w-[200px]">
                                <BookStatusBadge status={book.status as BookStatus} />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" checked={book.hasAudioBook} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">Has audiobook</label>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table