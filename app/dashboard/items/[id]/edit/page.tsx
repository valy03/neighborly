"use client"

import { use, useState, useEffect } from "react"
import { updateItem } from "@/app/actions/items"
import { useRouter } from "next/navigation"

const CATEGORIES = [
  "Tools & Equipment",
  "Books & Media",
  "Sports & Recreation",
  "Kitchen & Appliances",
  "Garden & Outdoor",
  "Electronics",
  "Other",
]

type Item = {
  id: string
  title: string
  description: string | null
  category: string
  imageUrl: string | null
}

export default function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)  // Unwrap the Promise
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [item, setItem] = useState<Item | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch the item data
    async function fetchItem() {
      try {
        const response = await fetch(`/api/items/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch item")
        }
        const data = await response.json()
        setItem(data)
      } catch (error) {
        console.error("Error fetching item:", error)
        setFetchError("Failed to load item")
      }
    }

    fetchItem()
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
    }

    const result = await updateItem(id, data)

    if (result?.error) {
      alert(result.error)
      setLoading(false)
    }
    // If successful, redirect happens in the action
  }

  if (fetchError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {fetchError}
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Item</h1>
        <p className="text-gray-600">Update your item details</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Item Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={item.title}
            placeholder="e.g., Power Drill, Camping Tent, Bread Maker"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={item.description || ""}
            placeholder="Add details about the item, its condition, any special instructions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={item.category}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            defaultValue={item.imageUrl || ""}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          />
          <p className="text-sm text-gray-500 mt-1">
            Add a link to an image of your item
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Updating..." : "Update Item"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}