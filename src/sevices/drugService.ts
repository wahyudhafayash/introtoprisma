import { prisma } from "../models/prisma.ts";

interface drug {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const createDrug = async (data: drug) => {
  return prisma.drug.create({ data });
};

export const getAllDrugs = async (
  filter: { name: string },
  page: number,
  limit: number
) => {
  if (filter && page && limit) {
    return prisma.drug.findMany({
      where: { name: { contains: filter.name } },
      skip: (page - 1) * limit,
      take: limit,
    });
  } else {
    return prisma.drug.findMany();
  }
};

export const getDrugById = async (id: number) => {
  return prisma.drug.findUnique({ where: { id } });
};

export const updateDrug = async (id: number, data: any) => {
  return prisma.drug.update({ where: { id }, data });
};

export const deleteDrug = async (id: number) => {
  return prisma.drug.delete({ where: { id } });
};
