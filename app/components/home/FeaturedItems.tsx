import { MapPin, Star } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

const featuredItems = [
  {
    id: 1,
    name: "DeWalt Power Drill",
    category: "Tools",
    distance: "0.3 mi",
    owner: "Mike R.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 2,
    name: "Settlers of Catan",
    category: "Games",
    distance: "0.5 mi",
    owner: "Sarah L.",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 3,
    name: "Stand Mixer",
    category: "Kitchen",
    distance: "0.2 mi",
    owner: "Emma W.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 4,
    name: "Camping Tent (4-Person)",
    category: "Outdoors",
    distance: "0.7 mi",
    owner: "James K.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
    available: false,
  },
]

export default function FeaturedItems() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Available Near You
            </h2>
            <p className="text-muted-foreground">
              Items your neighbors are ready to share
            </p>
          </div>
          <Button variant="outline-hero" className="hidden md:flex">
            View All Items
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Badge 
                  className={`absolute top-3 right-3 ${item.available ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {item.available ? "Available" : "On Loan"}
                </Badge>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-muted">{item.category}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.distance}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">by {item.owner}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{item.rating}</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Button 
                  variant="hero" 
                  className="w-full rounded-t-none rounded-b-2xl"
                  disabled={!item.available}
                >
                  {item.available ? "Request to Borrow" : "Join Waitlist"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline-hero" size="lg">
            View All Items
          </Button>
        </div>
      </div>
    </section>
  )
}