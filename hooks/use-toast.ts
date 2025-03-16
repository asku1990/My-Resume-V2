import { toast as sonnerToast } from 'sonner';

export interface ToastProps {
  description?: string;
  duration?: number;
  className?: string;
}

export function useToast() {
  return {
    toast: sonnerToast,
    success: (title: string, props?: ToastProps) => {
      sonnerToast.success(title, props);
    },
    error: (title: string, props?: ToastProps) => {
      sonnerToast.error(title, props);
    },
    message: (title: string, props?: ToastProps) => {
      sonnerToast.message(title, props);
    },
  };
}
