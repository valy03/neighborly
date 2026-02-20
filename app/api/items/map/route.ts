import  prisma  from "@/lib/prisma"
import { NextResponse } from "next/server"
import { calculateDistance } from "@/lib/distance"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const maxDistance = searchParams.get("maxDistance")
    const userLat = searchParams.get("userLat")
    const userLon = searchParams.get("userLon")

    // Build query
    const where: any = {
      available: true, // Only show available items
    }

    if (category && category !== "all") {
      where.category = category
    }

    // Get items from database
    let items = await prisma.item.findMany({
      where,
      select: {
        id: true,
        title: true,
        category: true,
        imageUrl: true,
        latitude: true,
        longitude: true,
        owner: {
          select: {
            name: true,
          },
        },
      },
    })

    // Filter by distance if user location provided
    if (maxDistance && userLat && userLon) {
      const maxDistanceNum = parseFloat(maxDistance)
      const userLatNum = parseFloat(userLat)
      const userLonNum = parseFloat(userLon)

      items = items.filter((item) => {
        const distance = calculateDistance(
          userLatNum,
          userLonNum,
          item.latitude,
          item.longitude
        )
        return distance <= maxDistanceNum
      })
    }

    // Add distance to each item if user location provided
    const itemsWithDistance = items.map((item) => {
      let distance = null
      if (userLat && userLon) {
        distance = calculateDistance(
          parseFloat(userLat),
          parseFloat(userLon),
          item.latitude,
          item.longitude
        )
      }

      return {
        ...item,
        distance,
      }
    })

    return NextResponse.json(itemsWithDistance)
  } catch (error) {
    console.error("Error fetching map items:", error)
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    )
  }
}