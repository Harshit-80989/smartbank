import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Home is the main page rendered at "/"
export default function Home() {
  return (
    <>
      {/* Reusable navigation bar */}
      <Navbar buttonText="Login" />

      {/* Hero section with dynamic content passed as props */}
      <Hero
        title="SmartBank"
        subtitle="Master your monetary matters."
        buttonText="Get Started"
      />
    </>
  );
}