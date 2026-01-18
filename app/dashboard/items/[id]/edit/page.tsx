"use client"

import { use, useState, useEffect } from "react"
import { updateItem } from "@/app/actions/items"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react"
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

type Item = {
  id: string
  title: string
  description: string | null
  category: string
  imageUrl: string | null
}

export default function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [item, setItem] = useState<Item | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
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
  }

  if (fetchError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{fetchError}</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <div className="h-6 w-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground">Loading item...</p>
        </div>
      </div>
    )
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
          Edit Item
        </h1>
        <p className="text-muted-foreground">Update your item details</p>
      </div>

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
            defaultValue={item.title}
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
            defaultValue={item.description || ""}
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
            defaultValue={item.category}
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
              defaultValue={item.imageUrl || ""}
              placeholder="https://example.com/image.jpg"
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-foreground bg-background placeholder:text-muted-foreground transition-all"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Add a link to an image of your item
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            variant="hero"
            size="lg"
            className="flex-1 gap-2"
          >
            <Save className="h-5 w-5" />
            {loading ? "Updating..." : "Update Item"}
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