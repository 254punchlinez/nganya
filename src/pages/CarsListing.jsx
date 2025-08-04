"use client"

import { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { fetchCars } from "@/store/slices/carsSlice"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import CarCard from "@/components/car/CarCard"
import CarFilter from "@/components/car/CarFilter"
import CarSort from "@/components/car/CarSort"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

const ITEMS_PER_PAGE = 8

const CarsListing = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { cars = [], loading, error } = useSelector((state) => state.cars)

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const initialSearchTerm = queryParams.get("search") || ""

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [filters, setFilters] = useState({
    search: initialSearchTerm,
    categories: [],
    brands: [],
    priceRange: [0, 1000000],
    yearRange: [1990, new Date().getFullYear()],
  })
  const [sortOrder, setSortOrder] = useState("year-desc")

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (!cars.length) dispatch(fetchCars())
  }, [dispatch, cars.length])

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debouncedSearchTerm }))
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  useEffect(() => {
    setSearchTerm(initialSearchTerm)
    setFilters((prev) => ({ ...prev, search: initialSearchTerm }))
  }, [initialSearchTerm])

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder)
    setCurrentPage(1)
  }

  const filteredAndSortedCars = useMemo(() => {
    const filtered = cars.filter((car) => {
      const matchesSearch =
        car.make.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.category.toLowerCase().includes(filters.search.toLowerCase())

      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(car.category)

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(car.make)

      const matchesPrice =
        car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]

      const matchesYear =
        car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1]

      return (
        matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesYear
      )
    })

    filtered.sort((a, b) => {
      switch (sortOrder) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "year-asc":
          return a.year - b.year
        case "year-desc":
          return b.year - a.year
        case "mileage-asc":
          return a.mileage - b.mileage
        case "mileage-desc":
          return b.mileage - a.mileage
        default:
          return 0
      }
    })

    return filtered
  }, [cars, filters, sortOrder])

  const totalPages = Math.ceil(filteredAndSortedCars.length / ITEMS_PER_PAGE)
  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedCars.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredAndSortedCars, currentPage])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
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
          <p>Error loading cars: {error}</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-8 animate-fade-in-up">
          Our Car Listings
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <CarFilter onFilterChange={handleFilterChange} initialFilters={filters} />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-auto flex-grow">
                <Input
                  type="text"
                  placeholder="Search by make, model, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-full"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <CarSort onSortChange={handleSortChange} currentSort={sortOrder} />
            </div>

            {paginatedCars.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <p className="text-xl font-semibold">No cars found matching your criteria.</p>
                <p className="mt-2">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-10">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CarsListing
