import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { PricingSection} from "@/components/pricing-section"
import { SlotRegistration } from "@/components/slot-registration"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <PricingSection />
      <SlotRegistration />
      <Footer />
    </main>
  )
}
