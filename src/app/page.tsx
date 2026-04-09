import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedContainer } from "@/components/AnimatedContainer";

export default function Home() {
  const products = [
    {
      title: "Gluta Rosa Soap",
      category: "Advanced Skin Whitening",
      price: "$25",
      imageSrc: "/images/soap_gluta_rosa.png"
    },
    {
      title: "Neem & Aloe Vera",
      category: "Purifying & Healing",
      price: "$18",
      imageSrc: "/images/soap_neem_1775763463564.png"
    },
    {
      title: "Kesar Chandan",
      category: "Skin Illuminating",
      price: "$18",
      imageSrc: "/images/soap_kesar_chandan_1775763443218.png"
    },
    {
      title: "Charcoal Detox",
      category: "Deep Pore Cleansing",
      price: "$20",
      imageSrc: "/images/soap_charcoal_detox.png"
    },
    {
      title: "Multani Mitti",
      category: "Oil Control & Cooling",
      price: "$16",
      imageSrc: "/images/soap_multani_mitti_1775763492845.png"
    },
    {
      title: "Rose & Beetroot",
      category: "Natural Glow & Tint",
      price: "$22",
      imageSrc: "/images/soap_rose_beetroot.png"
    },
    {
      title: "Korean Skin Whitening",
      category: "Intensive Brightening",
      price: "$25",
      imageSrc: "/images/soap_korean_skin_whitening.png"
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Story / Benefits Section */}
      <section id="benefits" className="py-32 px-6 md:px-12 bg-earth-umber text-canvas-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-8">
            <AnimatedContainer>
              <h2 className="text-4xl md:text-6xl font-instrument-serif leading-tight">
                Not just <span className="italic text-saffron-amber">soap</span>. <br/>
                A return to origin.
              </h2>
            </AnimatedContainer>
            
            <AnimatedContainer delay={0.2} className="space-y-6 text-canvas-white/80 text-lg">
              <p>
                Commercial cleansers strip your skin with synthetic detergents. Our artisanal blocks are formulated using cold-pressed Ayurvedic techniques that preserve the vital nutrients of every botanical.
              </p>
              <p>
                Zero chemicals. Zero artificial fragrances. Just pure, unadulterated nature in the palm of your hands.
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer delay={0.4}>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-canvas-white/20">
                <div>
                  <h4 className="text-3xl font-instrument-serif text-saffron-amber mb-2">100%</h4>
                  <span className="text-sm uppercase tracking-widest text-canvas-white/60">Organic <br/> Ingredients</span>
                </div>
                <div>
                  <h4 className="text-3xl font-instrument-serif text-saffron-amber mb-2">45</h4>
                  <span className="text-sm uppercase tracking-widest text-canvas-white/60">Days Curing <br/> Process</span>
                </div>
              </div>
            </AnimatedContainer>
          </div>
          
          <div className="relative aspect-square w-full max-w-md mx-auto md:ml-auto">
            <AnimatedContainer delay={0.3} className="w-full h-full relative rounded-t-[3rem] rounded-bl-[3rem] overflow-hidden">
              <img src="/images/soap_neem_1775763463564.png" alt="Neem formulation" className="object-cover w-full h-full" />
            </AnimatedContainer>
          </div>
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
