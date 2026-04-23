import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-md active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md active:scale-95",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md active:scale-95",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent/80 hover:shadow-md active:scale-95",
        highlight:
          "bg-highlight text-highlight-foreground shadow-sm hover:bg-highlight/80 hover:shadow-md active:scale-95",
        ghost: 
          "hover:bg-muted hover:text-foreground active:scale-95",
        link: 
          "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
        premium:
          "bg-gradient-to-r from-accent to-secondary text-accent-foreground shadow-md hover:shadow-lg hover:scale-105 active:scale-95 font-semibold",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
