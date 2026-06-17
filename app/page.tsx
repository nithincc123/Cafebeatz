import Hero from "./components/home-page/Hero";
import FoodAndAbout from "./components/home-page/FoodAndAbout";
import Locations from "./components/home-page/Locations";
import Events from "./components/home-page/Events";
import Gallery from "./components/home-page/Gallery";
import GiftCards from "./components/home-page/GiftCards";

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
