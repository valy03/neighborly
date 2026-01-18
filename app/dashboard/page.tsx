import { auth } from "@/lib/auth"
import { getUserItems } from "@/app/actions/items"
import Link from "next/link"
import ItemCard from "../components/ItemCard"
import { Plus, Package } from "lucide-react"
import { Button } from "../components/ui/button"

export default async function DashboardPage() {
  const session = await auth()
  const items = await getUserItems()

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Items
            </h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} listed
            </p>
          </div>
          <Link href="/dashboard/items/new">
            <Button variant="hero" size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Item
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl bg-card shadow-soft">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <Package className="h-10 w-10" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
            No items yet
          </h3>
          <p className="text-muted-foreground mb-8 text-center max-w-sm">
            Start sharing by adding your first item to the community
          </p>
          <Link href="/dashboard/items/new">
            <Button variant="hero" size="xl" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Your First Item
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}