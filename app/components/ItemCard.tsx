"use client"

import { useState } from "react"
import { deleteItem, toggleItemAvailability } from "@/app/actions/items"
import Link from "next/link"
import { Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

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
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <span className="text-6xl">📦</span>
            </div>
          )}
          <Badge 
            className={`absolute top-3 right-3 ${
              item.available
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {item.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
          
          {item.description && (
            <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
              {item.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleToggleAvailability}
              disabled={isToggling}
              variant="outline-hero"
              size="sm"
              className="flex-1 gap-2"
            >
              {isToggling ? (
                "..."
              ) : item.available ? (
                <>
                  <ToggleRight className="h-4 w-4" />
                  <span className="hidden sm:inline">Unavailable</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Available</span>
                </>
              )}
            </Button>
            
            <Link href={`/dashboard/items/${item.id}/edit`}>
              <Button variant="outline-hero" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline-hero"
              size="sm"
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-medium">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Delete Item?
            </h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "{item.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                variant="outline-hero"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}