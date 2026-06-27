import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { SoapTimeline } from "@/components/SoapTimeline";
import { StorySection } from "@/components/StorySection";
import Footer from "@/components/Footer";

// We use emoji as placeholders for the particles requested
const neemParticles = ["🌿", "🍃", "✨", "☀️", "🌿", "🍃"];
const detanParticles = ["☕", "🟡", "🤎", "✨", "☕", "🟡"];
const aloeParticles = ["💧", "🌿", "💦", "✨", "💧", "🌿"];
const riceParticles = ["🍚", "🥔", "✨", "☀️", "🍚", "🥔"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <Header />

      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Manufacturing Timeline (Horizontal Scroll) */}
      <SoapTimeline />

      {/* 3. Storytelling Sections */}
      <StorySection
        id="neem-story"
        title="Neem Soap"
        subtitle="The ultimate purifier."
        themeColor="#476b42"
        bgColor="#d1dcce"
        textColor="#2b3b28"
        particles={neemParticles}
        productImagePlaceholder="🌿"
        productImageUrl="/images/products/neem-soap.png"
        benefits={["100% Natural", "Herbal Solutions", "Toxin Free", "Holistic Wellness"]}
      />

      <StorySection 
        id="detan-story"
        title="De-Tan Soap"
        subtitle="Restore your natural glow."
        themeColor="#c4923e"
        bgColor="#f5efe6"
        textColor="#274e2d"
        particles={detanParticles}
        productImagePlaceholder="✨"
        productImageUrl="/images/products/detan-soap.png"
        benefits={["Removes Tan", "Brightens Skin", "Exfoliates Gently", "Rich in Antioxidants"]}
      />

      <StorySection
        id="aloe-story"
        title="Aloe Vera Soap"
        subtitle="Deep hydration & soothing care."
        themeColor="#6eb99a"
        bgColor="#f3efe6"
        textColor="#1f402c"
        particles={aloeParticles}
        productImagePlaceholder="🌱"
        productImageUrl="/images/products/aloe-vera-soap.png"
        benefits={["Intense Hydration", "Soothes Sunburn", "Anti-inflammatory", "Cooling Effect"]}
      />

      <StorySection
        id="rice-story"
        title="Rice & Potato"
        subtitle="Flawless, even skin tone."
        themeColor="#c28e46"
        bgColor="#faf4e8"
        textColor="#5e3e21"
        particles={riceParticles}
        productImagePlaceholder="🌾"
        productImageUrl="/images/products/rice-potato-soap.jpg"
        benefits={["Evens Skin Tone", "Reduces Blemishes", "Gentle Exfoliation", "Softens Skin"]}
      />

      <Footer />
    </main>
  );
}
