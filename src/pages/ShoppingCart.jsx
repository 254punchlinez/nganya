import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import CartItem from "@/components/cart/CartItem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCartIcon, Car } from "lucide-react"

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = cartItems.length > 0 ? 500 : 0 // Example fixed shipping
  const taxRate = 0.08 // Example tax rate
  const tax = subtotal * taxRate
  const total = subtotal + shipping + tax

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-8 animate-fade-in-up">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCartIcon className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <p className="text-2xl font-semibold text-foreground mb-3">Your cart is empty.</p>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any cars to your cart yet.</p>
            <Button asChild className="btn-hero">
              <Link to="/cars">
                Start Browsing Cars <Car className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Items in Cart ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-medium sticky top-20 self-start">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping:</span>
                    <span>${shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax ({taxRate * 100}%):</span>
                    <span>
                      ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>
                      ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full btn-hero">Proceed to Checkout</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ShoppingCart
