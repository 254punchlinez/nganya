import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
        <h1 className="text-9xl font-extrabold text-primary animate-fade-in-up">404</h1>
        <p
          className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Page Not Found
        </p>
        <p
          className="text-lg text-muted-foreground max-w-md mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily
          unavailable.
        </p>
        <Button asChild className="btn-hero animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Link to="/">Go to Homepage</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
