'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoginForm } from './login-form';
import type { LoginDialogProps } from '@/types/auth';

export function LoginDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  isLoading,
}: LoginDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your profile
          </DialogDescription>
        </DialogHeader>
        <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
