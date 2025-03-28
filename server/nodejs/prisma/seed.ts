import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
    } catch (error) {
      console.log(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "user.json",
    "tutor.json",
    "parent.json",
    "tutorSpecialty.json",
    "children.json",
    "course.json",
    "lesson.json",
    "availability.json",
    "courseReview.json",
    "tutorReview.json",
    "courseSubscription.json",
    "courseSubscriptionSchedule.json",
    "teachingSession.json",
    "sessionFeedback.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      for (const data of jsonData) {
        await model.create({ data });
      }
    } catch (error) {
      console.log(`Error seeding data for ${modelName}:`, error);
    }
  }
}

main()
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect());
