"use client"

import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user)
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to access this page.",
        variant: "destructive",
      })
    }
  }, [user, toast])

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
