import "./globals.css";
import Link from "next/link";
import LoginBtn from "./LoginBtn";
import LogOutBtn from "./LogoutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/list">List</Link>
          {session ? (
            <span>
              {session.user.name} <LogOutBtn />
            </span>
          ) : (
            <LoginBtn></LoginBtn>
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
