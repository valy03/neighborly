import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { MapPin, LogOut } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft group-hover:shadow-medium transition-shadow">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              Neighborly
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full ring-2 ring-border"
                />
              )}
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {session.user?.name}
              </span>
            </div>
            <form action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container py-8">
        {children}
      </main>
    </div>
  )
}