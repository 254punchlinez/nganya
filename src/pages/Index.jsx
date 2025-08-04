import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import CarCard from "@/components/car/CarCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Car, Tag, DollarSign } from "lucide-react"

const Index = () => {
  const cars = useSelector((state) => state.cars.cars)

  // Get 4 featured cars (e.g., newest or highest rated)
  const featuredCars = cars.slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] bg-hero-gradient text-primary-foreground flex items-center justify-center overflow-hidden">
          <img
            src="/src/assets/hero-car.png"
            alt="Sleek modern car"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="relative z-10 text-center px-4 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              Find Your <span className="gradient-text">Dream Car</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Explore a vast selection of new and used cars. Your perfect ride is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="btn-hero">
                <Link to="/cars">
                  Browse Cars <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="bg-background/20 text-primary-foreground border-primary-foreground/50 hover:bg-background/30 hover:text-primary-foreground"
              >
                Sell Your Car
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center mb-8 animate-fade-in-up">
            Featured Vehicles
          </h2>
          {featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No featured cars available at the moment.</p>
          )}
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/cars">View All Cars</Link>
            </Button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center mb-8 animate-fade-in-up">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-soft animate-fade-in-up">
                <Search className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">1. Find Your Car</h3>
                <p className="text-muted-foreground text-sm">
                  Browse our extensive listings, use filters, and search to find the perfect vehicle that matches your
                  needs.
                </p>
              </div>
              <div
                className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-soft animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                <DollarSign className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">2. Get the Best Deal</h3>
                <p className="text-muted-foreground text-sm">
                  Compare prices, review detailed specifications, and connect with sellers to negotiate the best offer.
                </p>
              </div>
              <div
                className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-soft animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <Car className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">3. Drive Away Happy</h3>
                <p className="text-muted-foreground text-sm">
                  Complete your purchase securely and drive home in your new car with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center mb-8 animate-fade-in-up">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Minivan", "Convertible", "Electric"].map(
              (category, index) => (
                <Link
                  key={category}
                  to={`/cars?category=${category}`}
                  className="flex flex-col items-center p-6 bg-card rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Tag className="h-10 w-10 text-primary mb-3" />
                  <span className="text-lg font-semibold">{category}</span>
                </Link>
              ),
            )}
          </div>
        </section>

        {/* Call to Action / Newsletter */}
        <section className="bg-accent-gradient text-accent-foreground py-12 md:py-16 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">Stay Updated with Carsokoni</h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-8 opacity-90 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Join our newsletter to receive the latest car listings, exclusive deals, and automotive news directly to
              your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow bg-accent-foreground/20 border-accent-foreground/50 placeholder:text-accent-foreground/70 text-accent-foreground"
              />
              <Button type="submit" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Index
