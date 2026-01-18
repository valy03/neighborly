import Link from "next/link"
import { auth } from "@/lib/auth"
import HeroSection from "../app/components/home/HeroSection"
import HowItWorks from "../app/components/home/HowItWorks"
import FeaturedItems from "../app/components/home/FeaturedItems"
import CategorySection from "../app/components/home/CategorySection"
import CTASection from "../app/components/home/CTASection"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft group-hover:shadow-medium transition-shadow">
              <span className="text-xl">🏘️</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              Neighborly
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {session ? (
              <Link
                href="/dashboard"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 shadow-soft transition-all"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 shadow-soft transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Landing Page Sections */}
      <HeroSection session={session} />
      <CategorySection />
      <FeaturedItems />
      <HowItWorks />
      <CTASection session={session} />
    </div>
  )
}