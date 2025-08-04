"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDebounce } from "@/hooks/use-debounce"

const CarFilter = ({ onFilterChange, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters)

  const debouncedFilters = useDebounce(filters, 500)

  useEffect(() => {
    onFilterChange(debouncedFilters)
  }, [debouncedFilters, onFilterChange])

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleBrandChange = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand) ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand],
    }))
  }

  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }))
  }

  const handleYearChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      yearRange: value,
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      search: "",
      categories: [],
      brands: [],
      priceRange: [0, 1000000],
      yearRange: [1990, new Date().getFullYear()],
    })
  }

  const allCategories = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Minivan", "Convertible", "Electric"]
  const allBrands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes-Benz", "Audi", "Tesla", "Nissan", "Hyundai", "Kia"]
  const currentYear = new Date().getFullYear()

  return (
    <div className="w-full md:w-64 lg:w-72 p-4 bg-card rounded-lg shadow-soft border border-border sticky top-20 self-start">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleClearFilters}>
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "category", "brand", "year"]} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-semibold">Price Range</AccordionTrigger>
          <AccordionContent className="py-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              min={0}
              max={1000000}
              step={5000}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="year">
          <AccordionTrigger className="text-base font-semibold">Year Range</AccordionTrigger>
          <AccordionContent className="py-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>
            <Slider
              min={1990}
              max={currentYear}
              step={1}
              value={filters.yearRange}
              onValueChange={handleYearChange}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-semibold">Category</AccordionTrigger>
          <AccordionContent className="py-2">
            <ScrollArea className="h-48 custom-scrollbar pr-4">
              <div className="space-y-2">
                {allCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-base font-semibold">Brand</AccordionTrigger>
          <AccordionContent className="py-2">
            <ScrollArea className="h-48 custom-scrollbar pr-4">
              <div className="space-y-2">
                {allBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CarFilter
