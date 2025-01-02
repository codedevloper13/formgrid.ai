import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const userAuthenticated = await isAuthenticated();
  if (!userAuthenticated) {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }
  return (
    <>
      <div className="flex h-[calc(100vh_-_66px)] w-full flex-row">
        <div className="flex relative w-[45px]">
          <main className="w-full flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
