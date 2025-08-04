"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchCars } from "@/store/slices/carsSlice"
import { addToCart } from "@/store/slices/cartSlice"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import CarImageGallery from "@/components/car/CarImageGallery"
import CarCard from "@/components/car/CarCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Tag, Gauge, Fuel, CalendarDays, PowerIcon as Horsepower, Car, Cog, Palette, Info } from "lucide-react"

const CarDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { cars, loading, error } = useSelector((state) => state.cars)
  const { toast } = useToast()

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(fetchCars())
    }
  }, [dispatch, cars.length])

  const car = cars.find((c) => c.id === id)

  const handleAddToCart = () => {
    if (car) {
      dispatch(addToCart(car))
      toast({
        title: "Added to Cart",
        description: `${car.make} ${car.model} has been added to your cart.`,
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 text-center text-destructive">
          <p>Error loading car details: {error}</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!car) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold">Car Not Found</h1>
          <p className="text-muted-foreground mt-4">The car you are looking for does not exist.</p>
          <Button asChild className="mt-6">
            <Link to="/cars">Back to Car Listings</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedCars = cars.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CarImageGallery images={car.images} />
            <Card className="mt-8 shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-medium sticky top-20 self-start">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  {car.year} {car.make} {car.model}
                </CardTitle>
                <p className="text-primary text-4xl font-extrabold mt-2">${car.price.toLocaleString()}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-accent" />
                    <span>
                      Mileage: <span className="font-semibold">{car.mileage.toLocaleString()} miles</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-accent" />
                    <span>
                      Fuel Type: <span className="font-semibold">{car.fuelType}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cog className="h-5 w-5 text-accent" />
                    <span>
                      Transmission: <span className="font-semibold">{car.transmission}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Horsepower className="h-5 w-5 text-accent" />
                    <span>
                      Horsepower: <span className="font-semibold">{car.horsepower} HP</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-accent" />
                    <span>
                      Engine: <span className="font-semibold">{car.engine}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-accent" />
                    <span>
                      Color: <span className="font-semibold">{car.color}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-accent" />
                    <span>
                      Category: <span className="font-semibold">{car.category}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-accent" />
                    <span>
                      Year: <span className="font-semibold">{car.year}</span>
                    </span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" /> Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {car.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 btn-hero" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {relatedCars.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold gradient-text mb-6 text-center">Related Cars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((relatedCar) => (
                <CarCard key={relatedCar.id} car={relatedCar} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default CarDetails
