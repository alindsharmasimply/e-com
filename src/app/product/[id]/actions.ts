"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export default async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleToBeIncremented = cart.items.find(
    (item) => item.productId === productId,
  );

  if (articleToBeIncremented) {
    await prisma.cartItem.update({
      where: { id: articleToBeIncremented.id },
      data: {
        quantity: { increment: 1 },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        productId,
        cartId: cart.id,
        quantity: 1,
      },
    });
  }

  //To refresh the page with the latest data.
  revalidatePath("/product/[id]");
}
