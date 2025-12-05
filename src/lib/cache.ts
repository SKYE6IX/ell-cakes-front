import { Cart, User } from "@/types/__generated__/graphql";
import { makeVar } from "@apollo/client";

export const cartVar = makeVar<Cart | null>(null);

export const isCartOpenVar = makeVar<boolean>(false);

export const userVar = makeVar<User | null>(null);
