import PDFDocument from "pdfkit";
import path from "path";

import { exportRepository } from "../repositories/export.repository.js";

export class ExportService {
    async generatePdf() {
        const departments =
            await exportRepository.getDirectory();

        const doc = new PDFDocument({
            margin: 40,
            size: "A4",
        });

        doc.font(
            path.join(
                process.cwd(),
                "fonts",
                "Roboto-Regular.ttf"
            )
        );

        doc.fontSize(22);

        doc.text("Telephone Directory");

        doc.moveDown();

        departments.forEach((department) => {
            doc
                .fontSize(16)
                .text(
                    `${department.name} (${department.location.name})`
                );

            doc.moveDown(0.5);

            department.employees.forEach(
                (employee) => {
                    doc
                        .fontSize(11)
                        .text(
                            `${employee.lastName} ${employee.firstName} ${employee.middleName ?? ""}`
                        );

                    doc.text(
                        `Position: ${employee.position}`
                    );

                    doc.text(
                        `Internal: ${employee.internalPhone ?? "-"}`
                    );

                    doc.text(
                        `City: ${employee.cityPhone ?? "-"}`
                    );

                    doc.text(
                        `Email: ${employee.email ?? "-"}`
                    );

                    doc.text(
                        `Room: ${employee.room ?? "-"}`
                    );

                    doc.moveDown();
                }
            );

            doc.moveDown();
        });

        doc.end();

        return doc;
    }
}

export const exportService =
    new ExportService();