import React from 'react';

export interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export interface AuthButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}
