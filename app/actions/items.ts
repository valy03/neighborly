"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


// Types

type CreateItemInput = {
  title: string
  description: string
  category: string
  imageUrl?: string
  latitude: number
  longitude: number
}

type UpdateItemInput = {
  title: string
  description: string
  category: string
  imageUrl?: string
}

// Create a new item
export async function createItem(data: CreateItemInput) {
    const session = await auth()

    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    try {
        await prisma.item.create({
            data: {
                title: data.title,
                description: data.description,
                category: data.category,
                imageUrl: data.imageUrl,
                latitude: data.latitude,
                longitude: data.longitude,
                ownerId: session.user.id,
        }
    })

    revalidatePath("/dashboard")
}
catch (error) {
    console.error("Error creating item:", error)
    return { error: "Failed to create item" }
}
    redirect("/dashboard") 
}

// Get user's items
export async function getUserItems() {
    const session = await auth()
    if (!session?.user?.id) {
    return []
  }

  try {
    const items = await prisma.item.findMany({
        where: {
            ownerId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    })
    return items
  } catch (error) {
    console.error("Error fetching user items:", error)
    return []
  }
}

// Update an existing item
export async function updateItem(id: string, data: UpdateItemInput) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    try {
        // Check ownership
        const item = await prisma.item.findUnique({
            where: { id },
        })

        if (!item || item.ownerId !== session.user.id) {
            return { error: "Unauthorized" }
        }

        await prisma.item.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                category: data.category,
                imageUrl: data.imageUrl,
            },
        })

        revalidatePath("/dashboard")
        
    } catch (error) {
        console.error("Error updating item:", error)
        return { error: "Failed to update item" }
    }
    redirect("/dashboard")
}

// Delete an item
export async function deleteItem(id: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }
    try {
        // check ownership
        const item = await prisma.item.findUnique({
            where: { id },
        })
        if (!item || item.ownerId !== session.user.id) {
            return { error: "Unauthorized" }
        }

        await prisma.item.delete({
            where: { id },
        })

        revalidatePath("/dashboard")

    } catch (error) {
        console.error("Error deleting item:", error)
        return { error: "Failed to delete item" }
    }
    redirect("/dashboard")
}

// Toggle item availability
export async function toggleItemAvailability(id: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check ownership
    const item = await prisma.item.findUnique({
      where: { id },
    })

    if (!item || item.ownerId !== session.user.id) {
      return { error: "Unauthorized" }
    }

    await prisma.item.update({
      where: { id },
      data: {
        available: !item.available,
      },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error toggling availability:", error)
    return { error: "Failed to toggle availability" }
  }
}