"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="flex items-center">
                <AvatarImage
                  src={user.image}
                  className="w-12 h-12 rounded-full object-fit"
                />
                <AvatarFallback className="text-3xl rounded-full bg-gray-200 py-3 px-5">
                  {user.username.toString().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="lg:mr-6 space-y-2">
              <DropdownMenuLabel className="text-lg">{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="w-full">Send your mysterious message</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              <Button
              className="w-full bg-transparent text-black hover:text-white hover:bg-red-700"
              onClick={() => signOut()}
            >
              Logout
            </Button>
              
            </DropdownMenuContent>
          </DropdownMenu>
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
