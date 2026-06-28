import { directoryRepository } from "../repositories/directory.repository.js";

export class DirectoryService {
    async getDirectory() {
        return directoryRepository.getDirectory();
    }
}

export const directoryService =
    new DirectoryService();