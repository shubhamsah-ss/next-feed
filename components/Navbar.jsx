"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user || {};
  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center">
        <a
          className="text-4xl font-bold mb-4 md:mb-0"
          href={session?.user ? "/dashboard" : "/"}
        >
          Next-Feed
        </a>
        {session ? (
            <Link href="/profile">
              <Avatar className="flex items-center">
                <AvatarImage
                  src={user.image}
                  className="w-12 h-12 rounded-full object-fit"
                />
                <AvatarFallback className="text-3xl rounded-full bg-gray-200 py-3 px-5">
                  {user.username.toString().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
        ) : (
          <Link href={"/sign-in"}>
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
