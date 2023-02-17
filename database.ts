import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getGroupAccessLevel(chatId: number) {
  const groupRecord = await prisma.groupAccessLevel.findFirst({
    where: { groupId: `${chatId}` },
  });

  return groupRecord;
}

export async function getGroupIds() {
  const groupRecords = await prisma.groupAccessLevel.findMany();
  return groupRecords.map((record) => record.groupId);
}

export async function createGroupRecord(chatId: number) {
  return await prisma.groupAccessLevel.create({
    data: {
      groupId: `${chatId}`,
      accessLevel: 1,
    },
  });
}

export async function setGroupAccessLevel(chatId: number, accessLevel: number) {
  return await prisma.groupAccessLevel.update({
    where: { groupId: `${chatId}` },
    data: {
      accessLevel,
    },
  });
}
