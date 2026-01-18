import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "hero" | "outline-hero" | "ghost"
  size?: "default" | "sm" | "lg" | "xl" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-soft",
      hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-medium hover:shadow-soft",
      "outline-hero": "border-2 border-border bg-background hover:bg-muted/50",
      ghost: "hover:bg-muted/50"
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 text-sm",
      lg: "h-11 px-6 text-base",
      xl: "h-14 px-8 text-lg",
      icon: "h-10 w-10"
    }
    
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }