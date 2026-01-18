import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTASection({ session }: { session: any }) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground/80 mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Join your neighbors</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Start sharing today
              </h2>
              <p className="text-primary-foreground/80 max-w-lg text-lg">
                List items you're willing to lend, discover what's available nearby, 
                and become part of a sharing community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {session ? (
                <>
                  <Link href="/dashboard/items/new">
                    <Button 
                      size="xl" 
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-medium"
                    >
                      List an Item
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button 
                      variant="ghost" 
                      size="lg"
                      className="text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button 
                      size="xl" 
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-medium"
                    >
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Learn More
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}