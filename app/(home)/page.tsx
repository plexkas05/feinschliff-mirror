import { HeroSection } from "@/components/hero-section"
import { PricingSection } from "@/components/pricing-section"
import { SlotRegistration } from "@/components/slot-registration"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PricingSection />
      <SlotRegistration />
    </main>
  )
}
