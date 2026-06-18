import { Metadata } from "next";

import Hero from "./components/home-page/Hero";
import FoodAndAbout from "./components/home-page/FoodAndAbout";
import Locations from "./components/home-page/Locations";
import Events from "./components/home-page/Events";
import Gallery from "./components/home-page/Gallery";
import GiftCards from "./components/home-page/GiftCards";

async function getSeo() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/home`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await res.json();

  console.log(result);

  return result.data;
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  return {
    title: seo.meta_title,
    description: seo.meta_desc,
    keywords: seo.meta_key,
  };
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F4F1EA]">
      <Hero />
      <FoodAndAbout />
      <Locations />
      <Events />
      <Gallery />
      <GiftCards />
    </main>
  );
}
