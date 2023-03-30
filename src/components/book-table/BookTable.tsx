import { type Book } from '@prisma/client'
import { Checkbox } from 'flowbite-react'
import React from 'react'
import { BookStatus } from '~/types/BookStatus'
import BookStatusBadge from '../book-status-badge/BookStatusBadge'

type Props = {
    data: Array<Book>
}

const Table = ({ data }: Props) => {
    return (
        <div className="relative overflow-x-auto">
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
                        <th scope="col" className="px-6 py-3">
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
                                    <input id="checkbox-table-search-1" type="checkbox" checked={book.needsReview} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">Needs review</label>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {book.name}
                            </td>
                            <td className="px-6 py-4">
                                {book.readAt?.toDateString() || '-'}
                            </td>
                            <td className="px-6 py-4">
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