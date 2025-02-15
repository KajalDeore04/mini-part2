import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl t">
              AI Course Generator
              <span className="mt-2 sm:block text-white">
                {" "}
                Custom Learning Paths, Powered by AI
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl sm:text-xl/relaxed">
              Unlock personalized learning paths, tailored to your goals and
              learning style. Get started today and take your career to the next
              level.
            </p>

            <Link href={'/dashboard'}><Button className="px-10 mt-20" href="#">
              Get Started
            </Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
