'use server';

import { PrismaClient, ActionType, EntityType } from '@prisma/client';
import { headers } from 'next/headers';
import { 
  AuditActionParams, 
  AuditUserLoginFn,
  AuditUserLogoutFn,
  AuditUserActionFn,
  AuditFailedLoginAttemptFn
} from '@/types/audit';

const prisma = new PrismaClient();

async function createAuditEntry({
  actionType,
  entityType,
  entityId,
  actorId,
  details,
  status = 'SUCCESS',
  metadata,
}: AuditActionParams) {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent');
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    return await prisma.auditLog.create({
      data: {
        actionType,
        entityType,
        entityId,
        actorId,
        details,
        status,
        metadata,
        ipAddress: ip,
        userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to create audit entry:', error);
    throw new Error('Failed to create audit entry');
  }
}

// Server actions for auditing
export const auditUserLogin: AuditUserLoginFn = async (userId, success, metadata) => {
  return createAuditEntry({
    actionType: ActionType.LOGIN,
    entityType: EntityType.USER,
    entityId: userId,
    actorId: userId,
    status: success ? 'SUCCESS' : 'FAILURE',
    metadata,
  });
}

export const auditUserLogout: AuditUserLogoutFn = async (userId, metadata) => {
  return createAuditEntry({
    actionType: ActionType.LOGOUT,
    entityType: EntityType.USER,
    entityId: userId,
    actorId: userId,
    metadata,
  });
}

export const auditUserAction: AuditUserActionFn = async (
  actionType,
  actorId,
  targetEntityType,
  targetEntityId,
  metadata
) => {
  return createAuditEntry({
    actionType,
    entityType: targetEntityType,
    entityId: targetEntityId,
    actorId,
    metadata,
  });
}

export const auditFailedLoginAttempt: AuditFailedLoginAttemptFn = async (username, details) => {
  return createAuditEntry({
    actionType: ActionType.FAILED_LOGIN_ATTEMPT,
    entityType: EntityType.USER,
    entityId: username,
    actorId: undefined,
    status: 'FAILURE',
    details,
  });
} 