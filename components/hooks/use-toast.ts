import { Toast } from "@/components/ui/toast"
import {
  useToast as useToastOriginal,
  toast,
} from "@/components/ui/use-toast"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

export function useToast() {
  return useToastOriginal()
}

export { Toast, toast }
export type { ToastActionElement, ToastProps }