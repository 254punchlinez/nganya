import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import LoginForm from "@/components/user/LoginForm"

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-8 md:py-12 bg-muted">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

export default Login
