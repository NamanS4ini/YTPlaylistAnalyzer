import { redirect } from "next/navigation";

export default async function DetailsUrlPage({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { url } = await params;
  redirect(`/${url}`);
}
