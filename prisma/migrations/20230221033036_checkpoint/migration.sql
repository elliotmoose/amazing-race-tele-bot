-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GroupAccessLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupId" TEXT NOT NULL,
    "accessLevel" INTEGER NOT NULL,
    "checkpointLevel" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_GroupAccessLevel" ("accessLevel", "groupId", "id") SELECT "accessLevel", "groupId", "id" FROM "GroupAccessLevel";
DROP TABLE "GroupAccessLevel";
ALTER TABLE "new_GroupAccessLevel" RENAME TO "GroupAccessLevel";
CREATE UNIQUE INDEX "GroupAccessLevel_groupId_key" ON "GroupAccessLevel"("groupId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
