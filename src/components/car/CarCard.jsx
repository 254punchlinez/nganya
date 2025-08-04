import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag, Gauge, Fuel, CalendarDays } from "lucide-react"

const CarCard = ({ car }) => {
  return (
    <Card className="car-card flex flex-col">
      <CardHeader className="p-0">
        <Link to={`/cars/${car.id}`}>
          <img
            src={
              car?.images?.[0] ||
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={`${car.make} ${car.model}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-xl"
            loading="lazy"
          />
        </Link>
      </CardHeader>

      <CardContent className="p-4 flex-grow space-y-2">
        <CardTitle className="text-xl font-semibold truncate">
          <Link to={`/cars/${car.id}`} className="hover:text-primary transition-colors">
            {car.year} {car.make} {car.model}
          </Link>
        </CardTitle>

        <p className="text-2xl font-bold text-primary">
          ${car.price.toLocaleString()}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4 text-accent" />
            <span>{car.mileage.toLocaleString()} miles</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4 text-accent" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-accent" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-accent" />
            <span>{car.category}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full btn-hero">
          <Link to={`/cars/${car.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CarCard
