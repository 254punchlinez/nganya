"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "@/store/slices/userSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, Menu, User, Car } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/cars?search=${searchTerm}`)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold gradient-text">
          <Car className="h-6 w-6" />
          Carsokoni
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/cars" className="text-sm font-medium hover:text-primary transition-colors">
            Cars
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Cart Button */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>

          {/* User Dropdown / Login-Register */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hi, {user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 py-6">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold gradient-text">
                  <Car className="h-6 w-6" />
                  Carsokoni
                </Link>
                <Separator />
                <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
  Home
</Link>
                <Link to="/cars" className="text-lg font-medium hover:text-primary transition-colors">
                  Cars
                </Link>
                <Link to="/about" className="text-lg font-medium hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                  Contact
                </Link>
                <Separator />
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                {user ? (
                  <>
                    <Link to="/profile" className="text-lg font-medium hover:text-primary transition-colors">
                      Profile
                    </Link>
                    <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
