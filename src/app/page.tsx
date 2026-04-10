import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import Image from "next/image";

export default function Home() {
  const products = [
    {
      title: "Neem Soap",
      category: "Antibacterial & Soothing",
      price: "₹30",
      description: "Best for acne-prone skin. Naturally antibacterial and healing.",
      imageSrc: "/images/soap_neem_1775763463564.png"
    },
    {
      title: "Aloe Vera Soap",
      category: "Hydration & Cooling",
      price: "₹30",
      description: "Infused with pure aloe vera for deep skin hydration and cooling.",
      imageSrc: "/images/soap_aloevera_1775763478607.png"
    },
    {
      title: "Rose Soap",
      category: "Fragrant & Gentle",
      price: "₹30",
      description: "Classic floral aromatherapy. Leaves skin soft and delicately scented.",
      imageSrc: "/images/soap_gluta_rosa.png"
    },
    {
      title: "Charcoal Detox",
      category: "Deep Pore Cleansing",
      price: "₹35",
      description: "Ayurvedic detox. Unclogs pores and fights blackheads effectively.",
      imageSrc: "/images/soap_charcoal_detox.png"
    },
    {
      title: "Multani Mitti",
      category: "Oil Control & Cooling",
      price: "₹35",
      description: "Traditional Fuller's Earth formula for natural oil balance and cooling.",
      imageSrc: "/images/soap_multani_mitti_1775763492845.png"
    },
    {
      title: "Rice Potato Soap",
      category: "Skin Lightening & Tan Removal",
      price: "₹35",
      description: "Powerful natural brightening combo for a radiant, even skin tone.",
      imageSrc: "/images/soap_korean_skin_whitening.png"
    },
    {
      title: "Neem Multani Mitti",
      category: "Double Action Healing",
      price: "₹35",
      description: "Combines antibacterial neem with oil-controlling clay.",
      imageSrc: "/images/soap_neem_1775763463564.png"
    },
    {
      title: "Rose-Beetroot",
      category: "Glow & Organic Tint",
      price: "₹35",
      description: "Rich in antioxidants for a natural pink glow and hydrated skin.",
      imageSrc: "/images/soap_rose_beetroot.png"
    },
    {
      title: "Aloe Vera Multani Mitti",
      category: "Hydrating Oil Control",
      price: "₹35",
      description: "The perfect balance of moisture and deep pore cleansing.",
      imageSrc: "/images/soap_multani_mitti_1775763492845.png"
    },
    {
      title: "Turmeric Sandalwood",
      category: "Radiance & Purity",
      price: "₹40",
      description: "Sacred Ayurvedic blend for golden skin radiance and purity.",
      imageSrc: "/images/soap_kesar_chandan_1775763443218.png"
    },
    {
      title: "D-Tan Soap",
      category: "Anti-Tanning Formula",
      price: "₹40",
      description: "Specialized formulation to reverse sun damage and reveal brightness.",
      imageSrc: "/images/soap_korean_skin_whitening.png"
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Story / Benefits Section */}
      <section id="about" className="py-32 px-6 md:px-12 bg-[#2C2C24] text-[#FDFCFB] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-10">
            <AnimatedContainer>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-8 bg-saffron-amber"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-saffron-amber font-bold">The Heritage</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-instrument-serif leading-[1.1]">
                Born in the <br/>
                <span className="italic text-saffron-amber">Heart of Surat</span>.
              </h2>
            </AnimatedContainer>
            
            <AnimatedContainer delay={0.2} className="space-y-8 text-[#FDFCFB]/80 text-lg md:text-xl font-outfit">
              <p className="leading-relaxed">
                Natural Cure is more than just a soap company. We are keepers of ancient Ayurvedic wisdom, handcrafted in Surat using traditional cold-pressed techniques that have been passed down for generations.
              </p>
              <p className="leading-relaxed">
                By allowing our soaps to cure naturally for 45 days, we preserve the vital nutrients of every botanical, ensuring that your skin receives the ultimate herbal nourishment—exactly as nature intended.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer delay={0.4}>
              <div className="grid grid-cols-2 gap-12 pt-10 border-t border-[#FDFCFB]/10">
                <div>
                  <h4 className="text-4xl font-instrument-serif text-saffron-amber mb-2 italic">Pure</h4>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#FDFCFB]/50 leading-loose">Chemical-Free <br/> Promise</span>
                </div>
                <div>
                  <h4 className="text-4xl font-instrument-serif text-saffron-amber mb-2 italic">Healing</h4>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#FDFCFB]/50 leading-loose">Ayurvedic <br/> Principles</span>
                </div>
              </div>
            </AnimatedContainer>
          </div>
          
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:ml-auto">
            <AnimatedContainer delay={0.3} className="w-full h-full relative rounded-t-[10rem] rounded-b-3xl overflow-hidden border-8 border-white/5 shadow-2xl">
              <Image 
                src="/images/soap_multani_mitti_1775763492845.png" 
                alt="Ayurvedic Soap Curing Process" 
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </AnimatedContainer>
            
            {/* Float badge */}
            <div className="absolute -bottom-6 -right-6 bg-saffron-amber text-[#2C2C24] p-8 rounded-full shadow-2xl flex flex-col items-center">
                <span className="text-2xl font-instrument-serif italic leading-none">100%</span>
                <span className="text-[0.6rem] font-bold uppercase tracking-tighter">Natural</span>
            </div>
          </div>
        </div>
        
        {/* Subtle background text */}
        <div className="absolute -bottom-20 -right-20 text-[20rem] font-instrument-serif text-white/5 pointer-events-none select-none italic">
          Organic
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <AnimatedContainer>
            <span className="text-xs uppercase tracking-[0.2em] text-sage-leaf mb-4 block">The Collection</span>
            <h2 className="text-4xl md:text-6xl font-instrument-serif">Ritual Essentials</h2>
          </AnimatedContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {products.map((product, idx) => (
            <ProductCard 
              key={product.title}
              {...product}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-earth-umber/10 text-center">
        <p className="text-earth-umber/60 text-sm">© {new Date().getFullYear()} Natural Cure. Handcrafted with purity.</p>
      </footer>
    </main>
  );
}
