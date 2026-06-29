export const exportApi = {
    exportPdf() {
        return fetch("/api/export/pdf", {
            method: "GET",
        }).then((r) => r.blob());
    },

    exportDocx() {
        return fetch("/api/export/docx", {
            method: "GET",
        }).then((r) => r.blob());
    },
};