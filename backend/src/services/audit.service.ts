import { auditRepository } from "../repositories/audit.repository.js";

export class AuditService {
    create(data: {
        action: string;
        entity: string;
        entityId: string;
        oldValue?: unknown;
        newValue?: unknown;
        userId?: string;
    }) {
        return auditRepository.create(data);
    }

    getAll() {
        return auditRepository.findAll();
    }
}

export const auditService = new AuditService();