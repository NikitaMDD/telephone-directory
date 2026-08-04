import PDFDocument from "pdfkit";
import path from "path";

import {
    AlignmentType,
    BorderStyle,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    TextRun,
    WidthType,
} from "docx";

import { exportRepository } from "../repositories/export.repository.js";

type EmployeeExport = {
    lastName: string;
    firstName: string;
    middleName?: string | null;
    position?: string | null;
    internalPhone?: string | null;
    cityPhone?: string | null;
    email?: string | null;
    room?: string | null;
};

type DepartmentExport = {
    name: string;
    location?: { name: string } | null;
    employees?: EmployeeExport[];
};

export class ExportService {
    private readonly pdfFontPath = path.join(
        process.cwd(),
        "fonts",
        "Roboto-Regular.ttf"
    );

    private getEmployeeFio(employee: EmployeeExport): string {
        return (
            [employee.lastName, employee.firstName, employee.middleName]
                .filter(Boolean)
                .join(" ")
                .trim() || "-"
        );
    }

    async generatePdf(): Promise<Buffer> {
        const departments =
            (await exportRepository.getDirectory()) as DepartmentExport[];

        const doc = new PDFDocument({
            margin: 40,
            size: "A4",
        });

        const chunks: Buffer[] = [];

        doc.on("data", (chunk: Buffer) => chunks.push(chunk));

        const result = new Promise<Buffer>((resolve, reject) => {
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.on("error", reject);
        });

        doc.font(this.pdfFontPath);

        doc.fontSize(22).text("Телефонный справочник", {
            align: "center",
        });

        doc.moveDown(1);

        for (const department of departments) {
            const employees = department.employees ?? [];

            const page = doc.page as unknown as {
                height: number;
                margins: { bottom: number };
            };

            // Чтобы заголовок отдела не оказывался в самом конце страницы
            if (doc.y > page.height - page.margins.bottom - 120) {
                doc.addPage();
                doc.font(this.pdfFontPath);
            }

            doc.fontSize(16).text(
                `${department.name} (${department.location?.name ?? "-"})`
            );

            doc.moveDown(0.5);

            this.drawEmployeesTable(doc, employees);

            doc.moveDown(1);
        }

        doc.end();

        return result;
    }

    private drawEmployeesTable(
        doc: InstanceType<typeof PDFDocument>,
        employees: EmployeeExport[]
    ): void {
        if (employees.length === 0) {
            doc.fontSize(10).text("Сотрудники не найдены");
            return;
        }

        const page = doc.page as unknown as {
            width: number;
            height: number;
            margins: {
                top: number;
                left: number;
                right: number;
                bottom: number;
            };
        };

        const margins = page.margins;
        const startX = margins.left;
        const tableWidth = page.width - margins.left - margins.right;
        const cellPadding = 4;
        const rowFontSize = 9;
        const headerFontSize = 9;

        let y = doc.y;
        const bottomLimit = page.height - margins.bottom;

        doc.lineWidth(0.5);

        const columns: Array<{ header: string; width: number }> = [
            { header: "ФИО", width: tableWidth * 0.28 },
            { header: "Должность", width: tableWidth * 0.2 },
            { header: "Внутр.", width: tableWidth * 0.12 },
            { header: "Город.", width: tableWidth * 0.12 },
            { header: "Email", width: tableWidth * 0.2 },
            { header: "Каб.", width: tableWidth * 0.08 },
        ];

        const getContentWidth = (column: { width: number }) =>
            column.width - cellPadding * 2;

        const measureHeight = (
            text: string,
            width: number,
            fontSize: number
        ): number =>
            doc.fontSize(fontSize).heightOfString(text, {
                width,
            });

        const getHeaderHeight = (): number => {
            return (
                Math.max(
                    ...columns.map((column) =>
                        measureHeight(
                            column.header,
                            getContentWidth(column),
                            headerFontSize
                        )
                    )
                ) + cellPadding * 2
            );
        };

        const drawHeader = (): void => {
            const headerHeight = getHeaderHeight();
            let x = startX;

            doc.save();

            columns.forEach((column) => {
                const contentWidth = getContentWidth(column);

                doc.rect(x, y, column.width, headerHeight).fillAndStroke(
                    "#EEEEEE",
                    "#999999"
                );

                doc.fillColor("#000000")
                    .fontSize(headerFontSize)
                    .text(
                        column.header,
                        x + cellPadding,
                        y + cellPadding,
                        {
                            width: contentWidth,
                        }
                    );

                x += column.width;
            });

            doc.restore();

            y += headerHeight;
        };

        const ensureSpace = (neededHeight: number): void => {
            if (y + neededHeight <= bottomLimit) {
                return;
            }

            doc.addPage();
            doc.font(this.pdfFontPath);
            y = margins.top;
            drawHeader();
        };

        // Если таблица начинается слишком близко к концу страницы
        if (y + 60 > bottomLimit) {
            doc.addPage();
            doc.font(this.pdfFontPath);
            y = margins.top;
        }

        drawHeader();

        for (const employee of employees) {
            const texts = [
                this.getEmployeeFio(employee),
                String(employee.position ?? "-"),
                String(employee.internalPhone ?? "-"),
                String(employee.cityPhone ?? "-"),
                String(employee.email ?? "-"),
                String(employee.room ?? "-"),
            ];

            const rowHeight =
                Math.max(
                    ...texts.map((text, index) =>
                        measureHeight(
                            text,
                            getContentWidth(columns[index]),
                            rowFontSize
                        )
                    )
                ) + cellPadding * 2;

            ensureSpace(rowHeight);

            let x = startX;

            doc.save();

            columns.forEach((column, index) => {
                const contentWidth = getContentWidth(column);

                doc.rect(x, y, column.width, rowHeight).stroke("#999999");

                doc.fillColor("#000000")
                    .fontSize(rowFontSize)
                    .text(texts[index], x + cellPadding, y + cellPadding, {
                        width: contentWidth,
                    });

                x += column.width;
            });

            doc.restore();

            y += rowHeight;
        }

        doc.x = startX;
        doc.y = y;
    }

    async generateDocx(): Promise<Buffer> {
        const departments =
            (await exportRepository.getDirectory()) as DepartmentExport[];

        const children: Array<Paragraph | Table> = [
            new Paragraph({
                text: "Телефонный справочник",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
            }),
        ];

        departments.forEach((department) => {
            const employees = department.employees ?? [];

            children.push(
                new Paragraph({
                    text: `${department.name} (${department.location?.name ?? "-"})`,
                    heading: HeadingLevel.HEADING_2,
                    spacing: {
                        before: 240,
                        after: 120,
                    },
                })
            );

            if (employees.length > 0) {
                children.push(this.createEmployeesTable(employees));
            } else {
                children.push(
                    new Paragraph({
                        text: "Сотрудники не найдены",
                    })
                );
            }

            children.push(
                new Paragraph({
                    text: "",
                    spacing: {
                        after: 240,
                    },
                })
            );
        });

        const doc = new Document({
            sections: [{ children }],
        });

        return Packer.toBuffer(doc);
    }

    private createEmployeesTable(employees: EmployeeExport[]): Table {
        const border = {
            style: BorderStyle.SINGLE,
            size: 1,
            color: "999999",
        };

        const headerTexts = [
            "ФИО",
            "Должность",
            "Внутренний телефон",
            "Городской телефон",
            "Email",
            "Кабинет",
        ];

        const headerRow = new TableRow({
            tableHeader: true,
            children: headerTexts.map(
                (text) =>
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text,
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                    })
            ),
        });

        const employeeRows = employees.map((employee) => {
            const values = [
                this.getEmployeeFio(employee),
                String(employee.position ?? "-"),
                String(employee.internalPhone ?? "-"),
                String(employee.cityPhone ?? "-"),
                String(employee.email ?? "-"),
                String(employee.room ?? "-"),
            ];

            return new TableRow({
                children: values.map(
                    (value) =>
                        new TableCell({
                            children: [
                                new Paragraph({
                                    text: value,
                                }),
                            ],
                        })
                ),
            });
        });

        return new Table({
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            borders: {
                top: border,
                bottom: border,
                left: border,
                right: border,
                insideHorizontal: border,
                insideVertical: border,
            },
            rows: [headerRow, ...employeeRows],
        });
    }
}

export const exportService = new ExportService();