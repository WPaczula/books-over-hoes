import React from 'react'
import { type BookStatus } from '~/types/BookStatus'

type Props = {
  status: BookStatus
}

const BookStatusBadge = ({ status }: Props) => {
  switch (status) {
    case 'COMPLETED': return <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">COMPLETED</span>
    case 'AWAITING_REVIEW': return <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">AWAITING REVIEW</span>
    case 'TO_BE_POSTED': return <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">TO BE POSTED</span>
    case 'TO_BE_READ': return <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">TO BE READ</span>
  }
}

export default BookStatusBadge