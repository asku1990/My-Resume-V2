import { ActionType, EntityType } from '@prisma/client';

export interface AuditActionParams {
  actionType: ActionType;
  entityType: EntityType;
  entityId: string;
  actorId?: string;
  details?: any;
  status?: string;
  metadata?: any;
}

export type AuditUserLoginFn = (userId: string, success: boolean, metadata?: any) => Promise<any>;
export type AuditUserLogoutFn = (userId: string, metadata?: any) => Promise<any>;
export type AuditUserActionFn = (
  actionType: ActionType,
  actorId: string,
  targetEntityType: EntityType,
  targetEntityId: string,
  metadata?: any
) => Promise<any>;
export type AuditFailedLoginAttemptFn = (username: string, details?: any) => Promise<any>; 