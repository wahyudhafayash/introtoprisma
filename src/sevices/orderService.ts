import { prisma } from "../models/prisma.ts";

interface Order {
  drug_id: number;
  quantity: number;
}

export const createOrder = async (data: Order) => {
  return prisma.$transaction(async (prisma) => {
    const drug = await prisma.drug.update({
      where: {
        id: data.drug_id,
      },
      data: {
        stock: {
          decrement: data.quantity,
        },
      },
    });
    if (drug.stock < 0) {
      throw new Error("Stock must be greater than zero");
    }
    const total = drug.price * data.quantity;
    const order = await prisma.order.create({
      data: {
        drug_id: data.drug_id,
        quantity: data.quantity,
        total: total,
      },
    });
    return order;
  });
};
