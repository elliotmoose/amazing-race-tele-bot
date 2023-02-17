-- CreateTable
CREATE TABLE "GroupAccessLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupId" TEXT NOT NULL,
    "accessLevel" INTEGER NOT NULL
);
