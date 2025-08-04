"use client"

import * as React from "react"
import { OTPInput, Slot, type OTPInputProps } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "../../lib/utils"

const InputOTP = React.forwardRef(function InputOTP({ className, containerClassName, ...props }, ref) {
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
})

const InputOTPGroup = React.forwardRef(function InputOTPGroup({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex items-center", className)} {...props} />
})

const InputOTPSlot = React.forwardRef(function InputOTPSlot({ index, className, ...props }, ref) {
  return (
    <Slot
      ref={ref}
      index={index}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        "focus-within:z-10 focus-within:ring-1 focus-within:ring-ring",
        className,
      )}
      {...props}
    />
  )
})

const InputOTPMultiplier = React.forwardRef(function InputOTPMultiplier({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn("-mx-1 flex items-center justify-center", className)} {...props}>
      <Dot />
    </div>
  )
})

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPMultiplier }
