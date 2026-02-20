"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import Link from "next/link"
import { formatDistance } from "@/lib/distance"
import "leaflet/dist/leaflet.css"

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

type MapItem = {
  id: string
  title: string
  category: string
  imageUrl: string | null
  latitude: number
  longitude: number
  distance: number | null
  owner: {
    name: string | null
  }
}

type MapProps = {
  items: MapItem[]
  center: [number, number]
  zoom?: number
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])
  return null
}

export default function Map({ items, center, zoom = 13 }: MapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-[600px] bg-muted/30 rounded-2xl flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-soft border border-border">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; CartoDB'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        />
        <RecenterMap center={center} />
        
        <MarkerClusterGroup chunkedLoading>
          {items.map((item) => (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.category}
                    {item.distance !== null && ` • ${formatDistance(item.distance)}`}
                  </p>
                  <Link
                    href={`/items/${item.id}`}
                    className="inline-block w-full text-center bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}