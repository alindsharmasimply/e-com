import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { cookies } from "next/dist/client/components/headers";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subTotal: number;
};

export async function createCart(): Promise<ShoppingCart> {
  //For anonymous user
  const newCart = await prisma.cart.create({
    data: {},
  });

  //TODO: Needs Encryption + Secure settings in real Production App
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subTotal: 0,
  };
}

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;

  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subTotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}
