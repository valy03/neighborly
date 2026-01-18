import { Wrench, Gamepad2, BookOpen, Bike, Camera, ChefHat } from "lucide-react"

const categories = [
  { name: "Tools", icon: Wrench, count: 234, color: "bg-primary/10 text-primary" },
  { name: "Games", icon: Gamepad2, count: 156, color: "bg-accent/10 text-accent" },
  { name: "Books", icon: BookOpen, count: 412, color: "bg-primary/10 text-primary" },
  { name: "Sports", icon: Bike, count: 89, color: "bg-accent/10 text-accent" },
  { name: "Electronics", icon: Camera, count: 67, color: "bg-primary/10 text-primary" },
  { name: "Kitchen", icon: ChefHat, count: 145, color: "bg-accent/10 text-accent" },
]

export default function CategorySection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Find what you need from your neighbors, organized by type
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${category.color} transition-transform group-hover:scale-110`}>
                <category.icon className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{category.name}</p>
                <p className="text-xs text-muted-foreground">{category.count} items</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}