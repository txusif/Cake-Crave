import { CartDataType } from "@/features/Cakes/CakeDetails/CakeCount";
import supabase from "./supabase";

type OrderDetailsType = {
    cartDetails: { cartItems: CartDataType[] },
    address: string,
    fullName: string,
    userId: string,
    phoneNumber: string,
}

export async function newOrder(orderDetails: OrderDetailsType) {
    const { data, error } = await supabase
        .from('orderDetails')
        .upsert([orderDetails])
        .select();

    if (error) throw new Error(error.message);
    return data;
}

export async function getOrder(orderId: string) {
    let { data, error } = await supabase
        .from('orderDetails')
        .select('*')
        .eq('orderId', orderId);

    if (error) throw new Error(error.message);
    return data;
}
