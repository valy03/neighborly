import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight, MapPin, Users, Package } from "lucide-react"

export default function HeroSection({ session }: { session: any }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6 animate-fade-up">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Community sharing made simple</span>
          </div>

          <h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-up" 
            style={{ animationDelay: "0.1s" }}
          >
            Borrow from your{" "}
            <span className="text-primary">neighbors</span>
          </h1>

          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" 
            style={{ animationDelay: "0.2s" }}
          >
            Why buy when you can borrow? Neighborly connects you with nearby items—
            from power tools to board games—all within walking distance.
          </p>

          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" 
            style={{ animationDelay: "0.3s" }}
          >
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="hero" size="xl">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard/items/new">
                  <Button variant="outline-hero" size="lg">
                    List Your First Item
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="hero" size="xl">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline-hero" size="lg">
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-up" 
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-card shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Package className="h-6 w-6" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">1,200+</span>
            <span className="text-sm text-muted-foreground">Items Available</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-card shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Users className="h-6 w-6" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">340+</span>
            <span className="text-sm text-muted-foreground">Active Neighbors</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-card shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">15</span>
            <span className="text-sm text-muted-foreground">Neighborhoods</span>
          </div>
        </div>
      </div>
    </section>
  )
}