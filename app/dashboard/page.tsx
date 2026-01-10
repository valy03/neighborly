import { auth } from "@/lib/auth"
import { getUserItems } from "@/app/actions/items"
import Link from "next/link"
import ItemCard from "@/app/components/ItemCard"

export default async function DashboardPage() {
  const session = await auth()
  const items = await getUserItems()

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Items
          </h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? "item" : "items"} listed
          </p>
        </div>
        <Link
          href="/dashboard/items/new"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          + Add Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No items yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start sharing by adding your first item
          </p>
          <Link
            href="/dashboard/items/new"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Add Your First Item
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