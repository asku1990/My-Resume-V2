'use server';

import { PrismaClient, ActionType, EntityType } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

interface AuditActionParams {
  actionType: ActionType;
  entityType: EntityType;
  entityId: string;
  actorId?: string;
  details?: any;
  status?: string;
  metadata?: any;
}

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
export async function auditUserLogin(userId: string, success: boolean, metadata?: any) {
  return createAuditEntry({
    actionType: ActionType.LOGIN,
    entityType: EntityType.USER,
    entityId: userId,
    actorId: userId,
    status: success ? 'SUCCESS' : 'FAILURE',
    metadata,
  });
}

export async function auditUserLogout(userId: string, metadata?: any) {
  return createAuditEntry({
    actionType: ActionType.LOGOUT,
    entityType: EntityType.USER,
    entityId: userId,
    actorId: userId,
    metadata,
  });
}

export async function auditUserAction(
  actionType: ActionType,
  actorId: string,
  targetEntityType: EntityType,
  targetEntityId: string,
  metadata?: any
) {
  return createAuditEntry({
    actionType,
    entityType: targetEntityType,
    entityId: targetEntityId,
    actorId,
    metadata,
  });
}

export async function auditFailedLoginAttempt(username: string, details?: any) {
  return createAuditEntry({
    actionType: ActionType.FAILED_LOGIN_ATTEMPT,
    entityType: EntityType.USER,
    entityId: username,
    actorId: undefined,
    status: 'FAILURE',
    details,
  });
} 