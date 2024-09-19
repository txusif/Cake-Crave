import supabase, { supabaseUrl } from "./supabase";

export async function updatePicture(avatar: File) {
    const filePath = avatar.name;
    const { error } = await supabase.storage.from('user').upload(filePath, avatar, {
        upsert: true,
    });

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    const { data, error: updateError } = await supabase.auth.updateUser({
        data: {
            image: `${supabaseUrl}/storage/v1/object/public/user/${filePath}`,
        },
    });

    if (updateError) throw new Error(error!.message);
    return data;
}

export async function removePicture() {
    const { data, error } = await supabase.auth.updateUser({
        data: {
            image: '',
        },
    });

    if (error) throw new Error(error.message);
    return data;
}

export async function signUp({ fullName, email, password }:
    { fullName: string, email: string, password: string }
) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName: fullName,
                image: '',
            },
        },
    });

    if (error) throw new Error(error.message);
    return data;
}

export async function login({ email, password }: {
    email: string, password: string
}) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);
    return data;
}


export async function resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw new Error(error.message);
    return data;
}

export async function updatePassword(newPassword: string) {
    console.log(newPassword);
    await supabase.auth.updateUser({ password: newPassword });
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);

    return data?.user;
}


export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
    return null;
}
