import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Optimizer from "@/components/Optimizer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Optimizer />
      </main>
      <Footer />
    </>
  );
}
