"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const CarImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.svg?height=600&width=800")

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-muted flex items-center justify-center rounded-lg">
        <span className="text-muted-foreground">No images available</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-medium">
        <img
          src={mainImage || "/placeholder.svg"}
          alt="Main car image"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative w-full aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200",
              mainImage === image
                ? "border-primary shadow-glow"
                : "border-transparent hover:border-muted-foreground/50",
            )}
            onClick={() => setMainImage(image)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {mainImage !== image && (
              <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarImageGallery
