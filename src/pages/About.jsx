import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Car, Users, Handshake, Globe } from "lucide-react"

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 animate-fade-in-up">About Carsokoni</h1>
          <p
            className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Your trusted partner in finding the perfect vehicle. We connect buyers and sellers with ease and
            transparency.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-medium animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <Car className="h-6 w-6 text-primary" /> Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              At Carsokoni, our mission is to revolutionize the car buying and selling experience. We strive to provide
              a seamless, transparent, and trustworthy platform where individuals can easily find their dream car or
              sell their current vehicle with confidence. We are committed to offering a diverse inventory, competitive
              pricing, and exceptional customer service.
            </CardContent>
          </Card>
          <Card className="shadow-medium animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <Users className="h-6 w-6 text-primary" /> Our Team
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              We are a passionate team of automotive enthusiasts and tech innovators dedicated to making your car
              journey enjoyable. From experienced sales professionals to skilled developers, every member of our team is
              committed to delivering excellence and ensuring your satisfaction. We believe in collaboration, continuous
              improvement, and putting our customers first.
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12 bg-border" />

        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 animate-fade-in-up">
            Why Choose Carsokoni?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-soft animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="flex flex-col items-center text-center">
                <Handshake className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl font-semibold">Trust & Transparency</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm text-center">
                We prioritize honesty and clarity in every transaction, ensuring you have all the information you need
                to make informed decisions.
              </CardContent>
            </Card>
            <Card className="shadow-soft animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader className="flex flex-col items-center text-center">
                <Car className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl font-semibold">Vast Selection</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm text-center">
                Explore a wide range of vehicles from various makes, models, and categories, all in one convenient
                place.
              </CardContent>
            </Card>
            <Card className="shadow-soft animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <CardHeader className="flex flex-col items-center text-center">
                <Globe className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl font-semibold">Seamless Experience</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm text-center">
                Our user-friendly platform and dedicated support team make buying or selling a car effortless.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
