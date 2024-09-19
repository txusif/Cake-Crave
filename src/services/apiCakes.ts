import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";

type GetCakesProps = {
    filterRatingObj: { field: string; value: string } | null;
    filterTypeObj: { field: string; value: string } | null;
    filterSortByObj: { field: string; value: string } | null;
    filterRangeObj: { field: string; value: string } | null;
    getDetailsId: string | null;
}

export type CakeType = {
    category: string;
    created_at: string;
    description: string;
    id: number;
    images: string[];
    ingredients: string;
    name: string;
    price: number;
    rating: number;
    type: string;
}

export type NewItemType = {
    id: number;
    ingredients: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export async function getCakes({
    filterRatingObj,
    filterTypeObj,
    filterSortByObj,
    filterRangeObj,
    getDetailsId,
}: GetCakesProps) {
    const query = supabase.from("cakes").select("*");

    if (filterRangeObj !== null)
        query.lte(filterRangeObj.field, filterRangeObj.value);

    if (filterRatingObj !== null)
        query.gte(filterRatingObj.field, filterRatingObj.value);

    if (filterTypeObj !== null)
        query.eq(
            filterTypeObj.field,
            filterTypeObj.value === "nonVeg" ? "non-veg" : filterTypeObj.value
        );

    if (filterSortByObj !== null)
        query.order("price", {
            ascending: filterSortByObj.value === "price-asc" ? true : false,
        });

    if (getDetailsId !== null) query.eq("id", getDetailsId);

    const { data, error }: {
        data: CakeType[] | null;
        error: PostgrestError | null;
    } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getCakesRaw() {
    const query = supabase.from("cakes").select("*");
    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
}

export async function getCart() {
    const query = supabase.from("cart").select("*");
    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
}


export async function addItem(newItem: NewItemType) {
    const { data, error } = await supabase
        .from("cart")
        .insert([newItem])
        .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function removeItem(id: number) {
    const { data, error } = await supabase
        .from("cart")
        .delete()
        .eq("id", id)
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function increaseItem(item: NewItemType) {
    const { data, error: updateError } = await supabase
        .from("cart")
        .update({
            quantity: item.quantity + 1,
            totalPrice: item.totalPrice + item.price,
        })
        .eq("id", item.id);

    if (updateError) throw new Error(updateError.message);

    return data;
}

export async function decreaseItem(item: NewItemType) {
    const query = supabase.from("cart");

    const isQuantityOne = item.quantity === 1;

    if (isQuantityOne) {
        removeCoupon();
        const { data, error: itemRemoveError } = await query
            .delete()
            .eq("id", item.id);

        if (itemRemoveError) throw new Error(itemRemoveError.message);
        return data;
    }
    const { data, error: updateError } = await query
        .update({
            quantity: item.quantity - 1,
            totalPrice: item.totalPrice - item.price,
        })
        .eq("id", item.id);

    if (updateError) throw new Error(updateError.message);
    return data;
}

export async function deleteItem(id: number) {
    removeCoupon();
    const { data, error } = await supabase.from("cart").delete().eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function getCoupon() {
    const { data, error } = await supabase.from("coupon").select().eq("id", 1);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function applyCoupon(coupon) {
    const { data, error } = await supabase
        .from("coupon")
        .update({ ...coupon, isCouponApplied: true })
        .eq("id", 1);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function removeCoupon() {
    const defaultData = {
        minBillValue: 0,
        couponValue: 0,
        calMethod: "",
        isCouponApplied: false,
    };

    const { error } = await supabase
        .from("coupon")
        .update({ ...defaultData })
        .eq("id", 1);

    if (error) {
        throw new Error(error.message);
    }
    return null;
}

export async function emptyCart() {
    const data = await getCart();
    let ids: number[] = [];
    if (data) {
        data.map((item) => (ids = [...ids, item.id]));
    }
    for (const id of ids) {
        const { error } = await supabase.from("cart").delete().eq("id", id);
        if (error) throw new Error(error.message);
    }

    return null;
}
