import { createClient } from "@/utils/supabase/client";

export async function signInWithEmail(email: string, password: string) {
  await createClient().auth.signInWithPassword({
    email: email,
    password: password,
  });
}

export async function signInWithGoogle() {
  await createClient()
    .auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })
    .then((res) => {
      console.log(res.data);
    });
}

export async function signUpWithEmail(email: string, password: string) {
  await createClient()
    .auth.signUp({
      email: email,
      password: password,
    })
    .then((res) => {
      const user = res.data.user;
      createClient()
        .from("users")
        .insert({ user_id: user?.id, username: user?.email })
        .then((result) => console.log(result));
    });
}
export async function resetPassword(email: string) {
  await createClient().auth.resetPasswordForEmail(email);
}
