import { Loader2 } from "lucide-react"

const LoadingSpinner = ({ className = "h-8 w-8" }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`animate-spin text-primary ${className}`} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner
