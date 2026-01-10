"use client"

import { useState, useEffect } from "react"
import { createItem } from "@/app/actions/items"
import { getCurrentLocation } from "@/lib/location"

const CATEGORIES = [
  "Tools & Equipment",
  "Books & Media",
  "Sports & Recreation",
  "Kitchen & Appliances",
  "Garden & Outdoor",
  "Electronics",
  "Other",
]

export default function NewItemPage() {
  const [loading, setLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  useEffect(() => {
    // Get user's location on mount
    getCurrentLocation().then((loc) => {
      if (loc) {
        setLocation(loc)
      } else {
        setLocationError("Unable to get your location. Please enable location services.")
      }
    })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (!location) {
      setLocationError("Location is required to list an item")
      return
    }

    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      latitude: location.latitude,
      longitude: location.longitude,
    }

    const result = await createItem(data)

    if (result?.error) {
      alert(result.error)
      setLoading(false)
    }
    // If successful, redirect happens in the action
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
        <p className="text-gray-600">
          List an item you're willing to lend to your neighbors
        </p>
      </div>

      {locationError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {locationError}
        </div>
      )}

      {location && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
          ✓ Location captured (approximate area for privacy)
        </div>
      )}

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
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
          />
          <p className="text-sm text-gray-500 mt-1">
            Add a link to an image of your item (image upload coming soon!)
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading || !location}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating..." : "List Item"}
          </button>
          <a
            href="/dashboard"
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}