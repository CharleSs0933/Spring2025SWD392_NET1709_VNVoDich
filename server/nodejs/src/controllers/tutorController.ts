import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   
    const tutor = await prisma.user.findMany({
      where: {
        role : 'Tutor'
      }
    });



    // Trả về dữ liệu với phân trang và filter
    res.json({
      message: "Courses retrieved successfully",
      data: tutor,
      // pagination: {
      //   total: totalCourses,
      //   page: pageNum,
      //   pageSize: pageSizeNum,
      //   totalPages: Math.ceil(totalCourses / pageSizeNum),
      // },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error retrieving courses", error });
  }
};
