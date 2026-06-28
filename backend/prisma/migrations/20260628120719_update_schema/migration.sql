/*
  Warnings:

  - You are about to drop the column `locationId` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Department` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DepartmentType" AS ENUM ('FACULTY', 'DEPARTMENT', 'ADMINISTRATION', 'OTHER');

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_locationId_fkey";

-- DropIndex
DROP INDEX "Employee_locationId_idx";

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "locationId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "DepartmentType" NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "locationId";

-- CreateIndex
CREATE INDEX "Department_locationId_idx" ON "Department"("locationId");

-- CreateIndex
CREATE INDEX "Department_type_idx" ON "Department"("type");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
