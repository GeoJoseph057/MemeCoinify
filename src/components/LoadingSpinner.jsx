import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </div>
  )
}