import { Link } from "react-router-dom"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag, Gauge, Fuel, CalendarDays, ImageOff } from "lucide-react"

const CarCard = ({ car }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  // Function to get a valid image URL with multiple fallbacks
  const getImageUrl = () => {
    // Check if car has images array and it's not empty
    if (car?.images && Array.isArray(car.images) && car.images.length > 0) {
      // Find the first non-empty image URL
      const validImage = car.images.find(img => img && typeof img === 'string' && img.trim() !== '')
      if (validImage) {
        return validImage
      }
    }

    // Check if car has a single image property
    if (car?.image && typeof car.image === 'string' && car.image.trim() !== '') {
      return car.image
    }

    // Fallback to a car-specific placeholder
    return `https://placehold.co/300x200/e2e8f0/64748b?text=${encodeURIComponent(car?.make || 'Car')}+${encodeURIComponent(car?.model || 'Image')}`
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  const imageUrl = getImageUrl()

  return (
    <Card className="car-card flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Link to={`/cars/${car.id}`}>
          {!imageError ? (
            <>
              {imageLoading && (
                <div className="w-full h-48 bg-gray-200 rounded-t-xl flex items-center justify-center animate-pulse">
                  <div className="text-gray-400">Loading...</div>
                </div>
              )}
              <img
                src={imageUrl}
                alt={`${car?.make || 'Unknown'} ${car?.model || 'Car'}`}
                width={300}
                height={200}
                className={`w-full h-48 object-cover rounded-t-xl transition-opacity duration-300 ${
                  imageLoading ? 'opacity-0 absolute' : 'opacity-100'
                }`}
                loading="lazy"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </>
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-t-xl flex flex-col items-center justify-center text-gray-400">
              <ImageOff className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">
                {car?.make} {car?.model}
              </span>
              <span className="text-xs">Image not available</span>
            </div>
          )}
        </Link>
      </CardHeader>

      <CardContent className="p-4 flex-grow space-y-2">
        <CardTitle className="text-xl font-semibold truncate">
          <Link 
            to={`/cars/${car.id}`} 
            className="hover:text-primary transition-colors"
          >
            {car?.year || 'N/A'} {car?.make || 'Unknown'} {car?.model || 'Car'}
          </Link>
        </CardTitle>

        <p className="text-2xl font-bold text-primary">
          ${car?.price ? car.price.toLocaleString() : 'Price on request'}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4 text-accent flex-shrink-0" />
            <span className="truncate">
              {car?.mileage ? `${car.mileage.toLocaleString()} miles` : 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4 text-accent flex-shrink-0" />
            <span className="truncate">{car?.fuelType || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-accent flex-shrink-0" />
            <span className="truncate">{car?.year || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-accent flex-shrink-0" />
            <span className="truncate">{car?.category || 'N/A'}</span>
          </div>
        </div>

        {/* Debug info - remove this in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-50 rounded">
            <div>Image URL: {imageUrl}</div>
            <div>Has images: {car?.images ? 'Yes' : 'No'}</div>
            <div>Images count: {car?.images?.length || 0}</div>
          </div>
        )}
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