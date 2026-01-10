import { auth } from "@/lib/auth"
import  prisma  from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params  // Unwrap the Promise

  try {
    const item = await prisma.item.findUnique({
      where: { id },
    })

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Check ownership
    if (item.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error fetching item:", error)
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    )
  }
}