import PDFDocument from "pdfkit";
import path from "path";

import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TextRun,
} from "docx";

import { exportRepository } from "../repositories/export.repository.js";

export class ExportService {
    async generatePdf(): Promise<Buffer> {
        const departments =
            await exportRepository.getDirectory();

        const doc = new PDFDocument({
            margin: 40,
            size: "A4",
        });

        const chunks: Buffer[] = [];

        doc.on("data", (chunk: Buffer) =>
            chunks.push(chunk)
        );

        const result = new Promise<Buffer>(
            (resolve, reject) => {
                doc.on("end", () =>
                    resolve(Buffer.concat(chunks))
                );
                doc.on("error", reject);
            }
        );

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
            doc.fontSize(16).text(
                `${department.name} (${department.location.name})`
            );

            doc.moveDown(0.5);

            department.employees.forEach(
                (employee) => {
                    doc.fontSize(11).text(
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

        return result;
    }

    async generateDocx(): Promise<Buffer> {
        const departments =
            await exportRepository.getDirectory();

        const children: Paragraph[] = [
            new Paragraph({
                text: "Телефонный справочник",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
            }),
        ];

        departments.forEach((department) => {
            children.push(
                new Paragraph({
                    text: `${department.name} (${department.location.name})`,
                    heading: HeadingLevel.HEADING_2,
                    spacing: {
                        before: 240,
                        after: 120,
                    },
                })
            );

            department.employees.forEach(
                (employee) => {
                    children.push(
                        new Paragraph({
                            spacing: { before: 120 },
                            children: [
                                new TextRun({
                                    text: `${employee.lastName} ${employee.firstName}${
                                        employee.middleName
                                            ? ` ${employee.middleName}`
                                            : ""
                                    }`,
                                    bold: true,
                                }),
                            ],
                        }),

                        new Paragraph({
                            text: `Должность: ${employee.position}`,
                        }),

                        new Paragraph({
                            text: `Внутренний: ${employee.internalPhone ?? "-"}  |  Городской: ${employee.cityPhone ?? "-"}`,
                        }),

                        new Paragraph({
                            text: `Email: ${employee.email ?? "-"}  |  Кабинет: ${employee.room ?? "-"}`,
                        })
                    );
                }
            );
        });

        const doc = new Document({
            sections: [{ children }],
        });

        return Packer.toBuffer(doc);
    }
}

export const exportService =
    new ExportService();