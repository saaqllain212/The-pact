import Navbar from './(landing)/Navbar'; // Import Navbar
import HeroSection from './(landing)/HeroSection';
import PhilosophySection from './(landing)/PhilosophySection';
import RealitySection from './(landing)/RealitySection';
import HowItWorksSection from './(landing)/HowItWorksSection';
import ReceiptSection from './(landing)/ReceiptSection';
import FooterSection from './(landing)/FooterSection'; // Import Footer

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar /> {/* Floating Controller */}
      
      <HeroSection />
      <PhilosophySection />
      <RealitySection />
      <HowItWorksSection />
      <ReceiptSection />
      
      <FooterSection /> {/* The End */}
    </main>
  );
}