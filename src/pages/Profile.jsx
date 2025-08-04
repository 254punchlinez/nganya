import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Mail, CalendarDays } from "lucide-react"

const Profile = () => {
  const user = useSelector((state) => state.user.user)

  if (!user) {
    // This case should ideally be handled by ProtectedRoute, but as a fallback:
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <p className="text-muted-foreground">Please log in to view your profile.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Card className="w-full max-w-2xl mx-auto shadow-medium">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary shadow-glow">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                alt={user.username}
              />
              <AvatarFallback className="text-3xl font-bold">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold">{user.username}</CardTitle>
            <CardDescription className="text-muted-foreground">Your Profile Information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <User className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Username</h3>
                  <p className="text-muted-foreground">{user.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CalendarDays className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Member Since</h3>
                  <p className="text-muted-foreground">{new Date(user.memberSince).toLocaleDateString()}</p>
                </div>
              </div>
              {/* Add more profile details here if available */}
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-muted-foreground text-sm">This is a basic profile page. More features coming soon!</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
