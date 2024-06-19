"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import messages from "@/data/messages.json";
import dateFormat from "@/lib/dateFormat";
import isUsername from "@/lib/isUsername";
import isValidUrl from "@/lib/isValidUrl";
import emblaCarouselAutoScroll from "embla-carousel-auto-scroll";
import { Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const form = useForm();
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    console.log(searchInput);
    const input = searchInput.trim();
    if (isValidUrl(input)) router.push(input);
    else if (isUsername(input)) {
      const username = input.slice(1);
      router.push(`/u/${username}`);
    }
  };

  return (
    <main
      className="flex-grow flex flex-col items-center justify-center
    p-5"
    >
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Give reviews or ask questions mysteriously
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Platform where your identify remains a secret.
        </p>
      </section>
      <Carousel
        className="w-full max-w-md"
        plugins={[
          emblaCarouselAutoScroll({
            speed: 0.5,
          }),
        ]}
      >
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col space-y-10 aspect-square items-center justify-center">
                    <span className="text-base font-semibold">
                      {message.content}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {dateFormat(message.createdAt)}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="space-y-5 mt-10 flex flex-col items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Send your mysterious message</Button>
          </DialogTrigger>
          <DialogContent className="rounded-md max-w-sm md:w-full md:max-w-lg">
            <DialogHeader>
              <DialogDescription>Profile link or @username</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col md:flex-row gap-2 items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  id="search"
                  name="search"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
              </div>
              <Button
                onClick={() => handleSearch()}
                type="submit"
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4 mr-2" />
                <span className="">Send</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="">
          <span>
            Join our mysterious community.{" "}
            <Link href="/sign-up" className="text-blue-400 hover:text-blue-600">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Home;
