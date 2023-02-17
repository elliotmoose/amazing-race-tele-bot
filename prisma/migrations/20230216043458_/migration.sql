/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `GroupAccessLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupAccessLevel_groupId_key" ON "GroupAccessLevel"("groupId");
