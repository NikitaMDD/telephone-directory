import { searchRepository } from "../repositories/search.repository.js";

export class SearchService {
    async search(query?: string) {
        const value = query?.trim() ?? "";

        if (!value) {
            return [];
        }

        return searchRepository.search(value);
    }
}

export const searchService = new SearchService();