"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const CarSort = ({ onSortChange, currentSort }) => {
  const handleValueChange = (value) => {
    onSortChange(value)
  }

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort-by" className="text-sm font-medium text-muted-foreground">
        Sort by:
      </Label>
      <Select onValueChange={handleValueChange} defaultValue={currentSort}>
        <SelectTrigger id="sort-by" className="w-[180px]">
          <SelectValue placeholder="Select sort order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="year-desc">Year: Newest First</SelectItem>
          <SelectItem value="year-asc">Year: Oldest First</SelectItem>
          <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
          <SelectItem value="mileage-desc">Mileage: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default CarSort
