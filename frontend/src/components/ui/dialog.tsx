"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Dialog = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 w-full max-w-lg p-4">
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "relative bg-gray-900 border border-blue-500/30 rounded-lg p-8 shadow-lg",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props} />
)

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold text-white", className)} {...props} />
)

const DialogTrigger = ({ asChild, children, ...props }: { asChild?: boolean; children: React.ReactNode } & React.HTMLAttributes<HTMLButtonElement>) => {
  if (asChild) {
    return <>{children}</>
  }
  return <button {...props}>{children}</button>
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger }
