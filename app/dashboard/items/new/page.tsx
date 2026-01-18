"use client"

import { useState, useEffect } from "react"
import { createItem } from "@/app/actions/items"
import { getCurrentLocation } from "@/lib/location"
import { MapPin, Image as ImageIcon, Package, ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

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
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Add New Item
        </h1>
        <p className="text-muted-foreground">
          List an item you're willing to lend to your neighbors
        </p>
      </div>

      {/* Location Status */}
      {locationError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {locationError}
          </p>
        </div>
      )}

      {location && (
        <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-primary flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location captured (approximate area for privacy)
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-soft p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
            Item Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g., Power Drill, Camping Tent, Bread Maker"
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-foreground bg-background placeholder:text-muted-foreground transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Add details about the item, its condition, any special instructions..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-foreground bg-background placeholder:text-muted-foreground transition-all resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-foreground bg-background transition-all"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground mb-2">
            Image URL (optional)
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-foreground bg-background placeholder:text-muted-foreground transition-all"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Add a link to an image of your item (image upload coming soon!)
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading || !location}
            variant="hero"
            size="lg"
            className="flex-1 gap-2"
          >
            <Package className="h-5 w-5" />
            {loading ? "Creating..." : "List Item"}
          </Button>
          <Link href="/dashboard">
            <Button
              type="button"
              variant="outline-hero"
              size="lg"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}