import { cookies } from "next/headers";
import { Appointment } from "@/src/features/appointments/types";
import HomePageContent from "@/src/components/Home/components/HomePage";

async function getAppointments(): Promise<Appointment[]> {
  const token = (await cookies()).get("auth_token")?.value;
  console.log(token);
  if (!token) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "default",
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch appointments", await res.text());
    return [];
  }

  return res.json();
}

export default async function HomePage() {
  const appointments = await getAppointments();

  return <HomePageContent initialAppointments={appointments} />;
}
