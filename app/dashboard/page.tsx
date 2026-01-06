import { auth } from "@/lib/auth"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Manage your items and borrow requests
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl mb-2">📦</div>
          <h3 className="text-lg font-semibold mb-1">My Items</h3>
          <p className="text-gray-600 text-sm mb-4">
            0 items listed
          </p>
          <Link
            href="/dashboard/items/new"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            Add your first item →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl mb-2">📬</div>
          <h3 className="text-lg font-semibold mb-1">Requests Received</h3>
          <p className="text-gray-600 text-sm mb-4">
            0 pending requests
          </p>
          <span className="text-gray-400 text-sm">
            Coming in Sprint 3
          </span>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl mb-2">🤝</div>
          <h3 className="text-lg font-semibold mb-1">My Requests</h3>
          <p className="text-gray-600 text-sm mb-4">
            0 active requests
          </p>
          <span className="text-gray-400 text-sm">
            Coming in Sprint 3
          </span>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
          🎉 Sprint 1 Progress
        </h3>
        <p className="text-indigo-700 mb-4">
          Authentication is working! You're signed in and can access the dashboard.
        </p>
        <div className="space-y-2 text-sm text-indigo-700">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Google OAuth authentication</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Protected routes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">⏳</span>
            <span>Item CRUD operations (next up!)</span>
          </div>
        </div>
      </div>
    </div>
  )
}