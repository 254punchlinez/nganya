"use client"

import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { updateQuantity, removeFromCart } from "@/store/slices/cartSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  const handleQuantityChange = (e) => {
    const newQuantity = Number.parseInt(e.target.value)
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
    }
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div className="flex items-center gap-4 border-b border-border py-4 last:border-b-0">
      <Link to={`/cars/${item.id}`} className="flex-shrink-0">
        <img
          src={item.images[0] || "/placeholder.svg?height=80&width=120&query=car-thumbnail"}
          alt={`${item.make} ${item.model}`}
          className="h-20 w-30 object-cover rounded-md"
        />
      </Link>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <div>
          <Link to={`/cars/${item.id}`} className="text-lg font-semibold hover:text-primary transition-colors">
            {item.year} {item.make} {item.model}
          </Link>
          <p className="text-muted-foreground text-sm">{item.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
            disabled={item.quantity <= 1}
          >
            -
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-16 text-center"
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
          >
            +
          </Button>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-lg font-bold">${(item.price * item.quantity).toLocaleString()}</span>
          <Button variant="destructive" size="icon" onClick={handleRemove}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
