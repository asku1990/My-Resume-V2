import { City as PrismaCity, Job as PrismaJob, Persona as PrismaPersona, Scene as PrismaScene, JobType as PrismaJobType } from '@prisma/client';

export interface Job {
  id: string;
  kindKey: string;
  type: JobType;
  name: string;
  description: string;
  clientKey: string;
  requiredLevel: number;
  reward: number;
  coordinate: { x: number; y: number };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  sceneId: string;
  scene?: Scene | null;
  clientId?: string | null;
  client?: PrismaPersona | null;
  cityId?: string | null;
  city?: PrismaCity | null;
}

export type Scene = Omit<PrismaScene, 'name'> & {
  kindKey: string;
};

export interface Persona {
  id: string;
  name: string;
  kindKey: string;
  description?: string | null;
  personality?: string | null;
  avatarUrl?: string | null;
  isActive: boolean;
  voiceId: string;
}

export interface City {
  id: string;
  name: string;
  label: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum SceneStatus {
  IN_PREPARATION = 'IN_PREPARATION',
  PREPARED = 'PREPARED',
  READY = 'READY',
  ARCHIVED = 'ARCHIVED'
}

export enum JobType {
  REGULAR_RS = 'REGULAR_RS',
  SPECIAL_PROJECT = 'SPECIAL_PROJECT',
  CONTESTS = 'CONTESTS',
  REGULAR_FP = 'REGULAR_FP'
}

export interface CreateJobData {
  type: JobType;
  name: string;
  description: string;
  sceneId: string;
  clientId: string;
  cityId: string;
  coordinate: {
    x: number;
    y: number;
  };
}

export interface Coordinate {
  x: string;
  y: string;
}

export interface JobFormData {
  type: string;
  name: string;
  description: string;
  sceneId: string;
  clientId: string;
  coordinate: {
    x: string;
    y: string;
  };
}

// Additional types for the job manager
export interface JobsState {
  cities: City[];
  activeJobs: Job[];
  inactiveJobs: Job[];
  selectedCity: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface JobCardProps {
  job: PrismaJob;
  onStatusChange: (jobId: string, isActive: boolean) => void;
  onEdit: (jobId: string) => void;
  onDelete: (jobId: string) => void;
}

export interface JobsColumnProps {
  title: string;
  jobs: PrismaJob[];
  onStatusChange: (jobId: string, isActive: boolean) => void;
  onEdit: (jobId: string) => void;
  onDelete: (jobId: string) => void;
}

export interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCity: City | null;
  onJobCreated: () => void;
} 