import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  const token = (await cookies()).get("auth_token")?.value;

  if (token) {
    redirect("/home");
  }

  redirect("/login");
}
