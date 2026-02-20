"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { MapPin, Filter } from "lucide-react"
import { Button } from "../components/ui/button"

const Map = dynamic(() => import("@/app/components/map/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-muted/30 rounded-2xl flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
})

const CATEGORIES = [
  "All Categories",
  "Tools & Equipment",
  "Books & Media",
  "Sports & Recreation",
  "Kitchen & Appliances",
  "Garden & Outdoor",
  "Electronics",
  "Other",
]

const DISTANCES = [
  { label: "All", value: null },
  { label: "1 mile", value: 1 },
  { label: "5 miles", value: 5 },
  { label: "10 miles", value: 10 },
]

export default function BrowsePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [category, setCategory] = useState("All Categories")
  const [maxDistance, setMaxDistance] = useState<number | null>(null)

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error("Error getting location:", error)
          // Default to a location (e.g., San Francisco)
          setUserLocation([37.7749, -122.4194])
        }
      )
    } else {
      setUserLocation([37.7749, -122.4194])
    }
  }, [])

  // Fetch items
  useEffect(() => {
    async function fetchItems() {
      if (!userLocation) return

      setLoading(true)
      try {
        const params = new URLSearchParams({
          userLat: userLocation[0].toString(),
          userLon: userLocation[1].toString(),
        })

        if (category !== "All Categories") {
          params.append("category", category)
        }

        if (maxDistance !== null) {
          params.append("maxDistance", maxDistance.toString())
        }

        const response = await fetch(`/api/items/map?${params}`)
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error("Error fetching items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [userLocation, category, maxDistance])

  if (!userLocation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Getting your location...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="container py-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Browse Items Near You
          </h1>
          <p className="text-muted-foreground">
            {loading ? "Loading..." : `${items.length} items available`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters:</span>
            </div>
            
            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Distance Filter */}
            <select
              value={maxDistance ?? ""}
              onChange={(e) => setMaxDistance(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {DISTANCES.map((dist) => (
                <option key={dist.label} value={dist.value ?? ""}>
                  {dist.label}
                </option>
              ))}
            </select>

            {/* Reset Filters */}
            {(category !== "All Categories" || maxDistance !== null) && (
              <Button
                variant="outline-hero"
                size="sm"
                onClick={() => {
                  setCategory("All Categories")
                  setMaxDistance(null)
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="container py-8">
        <Map items={items} center={userLocation} />
      </div>
    </div>
  )
}