"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider>")
  }
  return context
}

const SidebarProvider = ({ children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const collapse = () => setIsCollapsed(!isCollapsed)

  const value = React.useMemo(() => ({ isOpen, setIsOpen, toggle, isCollapsed, collapse }), [isOpen, isCollapsed])

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

const Sidebar = React.forwardRef(function Sidebar({ className, children, ...props }, ref) {
  const { isOpen, isCollapsed } = useSidebar()

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-full flex-col border-r bg-sidebar transition-all duration-300",
        isOpen ? "w-64" : "w-0",
        isCollapsed && isOpen && "w-20",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  )
})

const SidebarHeader = React.forwardRef(function SidebarHeader({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("flex items-center justify-between p-4", className)} {...props}>
      {children}
    </div>
  )
})

const SidebarContent = React.forwardRef(function SidebarContent({ className, children, ...props }, ref) {
  return (
    <ScrollArea ref={ref} className={cn("flex-1 px-4 py-2", className)} {...props}>
      {children}
    </ScrollArea>
  )
})

const SidebarFooter = React.forwardRef(function SidebarFooter({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("p-4 border-t border-sidebar-border", className)} {...props}>
      {children}
    </div>
  )
})

const SidebarGroup = React.forwardRef(function SidebarGroup({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("mb-4 last:mb-0", className)} {...props}>
      {children}
    </div>
  )
})

const SidebarGroupLabel = React.forwardRef(function SidebarGroupLabel({ className, children, ...props }, ref) {
  return (
    <h4 ref={ref} className={cn("mb-2 px-3 text-sm font-semibold text-sidebar-foreground", className)} {...props}>
      {children}
    </h4>
  )
})

const SidebarGroupContent = React.forwardRef(function SidebarGroupContent({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  )
})

const SidebarMenu = React.forwardRef(function SidebarMenu({ className, children, ...props }, ref) {
  return (
    <nav ref={ref} className={cn("space-y-1", className)} {...props}>
      {children}
    </nav>
  )
})

const SidebarMenuItem = React.forwardRef(function SidebarMenuItem({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
})

const SidebarMenuButton = React.forwardRef(function SidebarMenuButton(
  { className, isActive, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? "div" : Button // Use div if asChild is true, otherwise Button
  return (
    <Comp
      ref={ref}
      className={cn(
        "w-full justify-start text-left font-normal",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          : "text-sidebar-foreground hover:bg-sidebar-primary/10",
        className,
      )}
      variant="ghost"
      {...props}
    />
  )
})

const SidebarInput = React.forwardRef(function SidebarInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md border border-sidebar-border bg-sidebar-primary px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sidebar-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
})

const SidebarRail = React.forwardRef(function SidebarRail({ className, children, ...props }, ref) {
  const { isOpen, isCollapsed } = useSidebar()
  if (isOpen) return null // Only show rail if sidebar is closed

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-full w-20 flex-col border-r bg-sidebar transition-all duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})

const SidebarTrigger = React.forwardRef(function SidebarTrigger({ className, ...props }, ref) {
  const { toggle } = useSidebar()
  return (
    <Button ref={ref} variant="ghost" size="icon" onClick={toggle} className={cn("h-8 w-8", className)} {...props} />
  )
})

const SidebarInset = React.forwardRef(function SidebarInset({ className, children, ...props }, ref) {
  const { isOpen } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn("flex-1 transition-all duration-300", isOpen ? "ml-64" : "ml-0", className)}
      {...props}
    >
      {children}
    </div>
  )
})

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
}
