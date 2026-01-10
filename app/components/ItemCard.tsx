"use client"

import { useState } from "react"
import { deleteItem, toggleItemAvailability } from "@/app/actions/items"
import Link from "next/link"

type Item = {
  id: string
  title: string
  description: string | null
  category: string
  imageUrl: string | null
  available: boolean
  createdAt: Date
}

export default function ItemCard({ item }: { item: Item }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    const result = await deleteItem(item.id)
    
    if (result?.error) {
      alert(result.error)
      setIsDeleting(false)
    }
    // If successful, page will revalidate
  }

  async function handleToggleAvailability() {
    setIsToggling(true)
    const result = await toggleItemAvailability(item.id)
    
    if (result?.error) {
      alert(result.error)
    }
    setIsToggling(false)
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          <span className="text-6xl">📦</span>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              item.available
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {item.available ? "Available" : "Unavailable"}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
        
        {item.description && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleToggleAvailability}
            disabled={isToggling}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-gray-700"
          >
            {isToggling ? "..." : item.available ? "Mark Unavailable" : "Mark Available"}
          </button>
          
          <Link
            href={`/dashboard/items/${item.id}/edit`}
            className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
          >
            Edit
          </Link>
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-2">Delete Item?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{item.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 disabled:bg-gray-400"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 border border-gray-300 px-4 py-2 rounded font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}