import { Plus, SlidersHorizontal } from "@phosphor-icons/react";

const categories = ["All pieces", "Clothing", "Accessories", "Home & living", "Footwear"];

const products = [
  {
    name: "Everyday leather tote",
    category: "Accessories",
    price: "$89.00",
    image: "photo-1548036328-c9fa89d128fa",
    badge: "Bestseller",
  },
  {
    name: "Cloud-knit pullover",
    category: "Clothing",
    price: "$64.00",
    image: "photo-1576566588028-4147f3842f27",
    badge: "New arrival",
  },
  {
    name: "Studio ceramic set",
    category: "Home & living",
    price: "$42.00",
    image: "photo-1490312278390-ab64016e0aa9",
  },
  {
    name: "Weekend runners",
    category: "Footwear",
    price: "$110.00",
    image: "photo-1542291026-7eec264c27ff",
  },
  {
    name: "Relaxed linen shirt",
    category: "Clothing",
    price: "$58.00",
    image: "photo-1596755389378-c31d21fd1273",
  },
  {
    name: "Soft woven throw",
    category: "Home & living",
    price: "$72.00",
    image: "photo-1583845112203-454cdd0d3a1b",
  },
  {
    name: "Daily carry pouch",
    category: "Accessories",
    price: "$36.00",
    image: "photo-1553062407-98eeb64c6a62",
  },
  {
    name: "Classic suede clogs",
    category: "Footwear",
    price: "$95.00",
    image: "photo-1603487742131-4160ec999306",
  },
];

function Shop() {
  return (
    <main className="min-h-screen bg-[#F7F6F2] px-5 py-10 text-[#1C1917] sm:px-8 sm:py-16">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#064E3B]">
          THE SHOPSPHERE EDIT
        </p>
        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              Find your <span className="font-serif italic text-[#064E3B]">good stuff.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#78716C]">
              Thoughtfully chosen pieces for the everyday moments that matter most.
            </p>
          </div>
          <p className="text-sm text-[#78716C]">Showing 24 carefully selected pieces</p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-y border-[#E7E5E4] py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  index === 0
                    ? "bg-[#064E3B] text-white"
                    : "border border-[#E7E5E4] bg-white text-[#78716C] hover:border-[#064E3B] hover:text-[#064E3B]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-4 py-2 text-sm font-medium text-[#1C1917] transition hover:border-[#064E3B] hover:text-[#064E3B]">
            <SlidersHorizontal aria-hidden="true" size={17} />
            Filter & sort
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.name}>
              <a href="#product" className="group relative block aspect-[4/5] overflow-hidden bg-stone-200">
                <img
                  src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=85`}
                  alt={product.name}
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute left-3 top-3 bg-[#C9A227] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white sm:left-4 sm:top-4">
                    {product.badge}
                  </span>
                )}
                <span aria-label={`Add ${product.name} to cart`} className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white text-[#064E3B] transition group-hover:bg-[#064E3B] group-hover:text-white sm:bottom-4 sm:right-4">
                  <Plus aria-hidden="true" size={20} />
                </span>
              </a>
              <div className="flex justify-between gap-3 pt-3">
                <div>
                  <p className="text-sm font-medium text-[#1C1917]">{product.name}</p>
                  <p className="mt-1 text-xs text-[#78716C]">{product.category}</p>
                </div>
                <p className="whitespace-nowrap text-sm font-medium text-[#1C1917]">{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Shop;
