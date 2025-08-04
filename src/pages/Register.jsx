import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import RegisterForm from "@/components/user/RegisterForm"

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-8 md:py-12 bg-muted">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}

export default Register
