import { Search, MessageSquare, Package, Heart } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Find What You Need",
    description: "Browse items near you using our map or search by category. Filter by distance, availability, and ratings.",
  },
  {
    icon: MessageSquare,
    title: "Request to Borrow",
    description: "Send a borrow request to the owner. Include your dates and any notes about your intended use.",
  },
  {
    icon: Package,
    title: "Pick Up & Return",
    description: "Coordinate pickup with your neighbor. Use the item, then return it in good condition.",
  },
  {
    icon: Heart,
    title: "Build Community",
    description: "Leave a review, share your experience, and build trust within your neighborhood.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Borrowing from your neighbors is simple and secure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-64px)] h-0.5 bg-border" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-medium">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm shadow-soft">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}