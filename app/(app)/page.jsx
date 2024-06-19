"use client"
import SendMessage from "@/components/SendMessage";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import messages from "@/data/messages.json";
import dateFormat from "@/lib/dateFormat";
import emblaCarouselAutoScroll from "embla-carousel-auto-scroll";
import Link from "next/link";

const Home = () => {

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
        <SendMessage />
          <span>
            Join our mysterious community.{" "}
            <Link href="/sign-up" className="text-blue-400 hover:text-blue-600">
              Sign up
            </Link>
          </span>
      </div>
    </main>
  );
};

export default Home;
