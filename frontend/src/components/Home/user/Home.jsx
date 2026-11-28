import { ArrowUpRight, Plus, Sparkle } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  return (
    <main className="bg-[#F7F6F2] text-[#1C1917]">
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 md:items-center md:py-16 lg:gap-16">
        <div className="py-6 md:py-12">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#064E3B]">
            <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
            GOOD THINGS, FOUND HERE
          </p>
          <h1 className="max-w-xl text-5xl font-medium leading-[1.05] tracking-tight text-[#1C1917] sm:text-6xl lg:text-7xl">
            Make room for{" "}
            <span className="font-serif italic text-[#064E3B]">
              the good stuff.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#78716C]">
            A thoughtful collection for everyday living. Find pieces you’ll
            love, made to stay with you.
          </p>
          <a
            href="#featured"
            className="mt-8 inline-flex items-center gap-5 rounded-full bg-[#064E3B] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#022C22]"
          >
            Explore the collection{" "}
            <ArrowUpRight
              aria-hidden="true"
              size={18}
            />
          </a>
          <p className="mt-12 flex items-center text-sm text-[#78716C]">
            <Sparkle
              aria-hidden="true"
              className="mr-2 text-[#C9A227]"
              size={18}
            />
            Curated with care <span className="mx-2">·</span> Made for real life
          </p>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-stone-100 sm:min-h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1500&q=85"
            alt="A selection of timeless clothing in warm natural light"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur-sm sm:bottom-7 sm:left-7">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-stone-500">
              THE EVERYDAY EDIT
            </p>
            <p className="mt-1 text-lg font-medium text-stone-900">
              Pieces to keep close
            </p>
          </div>
          <Sparkle
            aria-hidden="true"
            className="absolute right-6 top-5 text-white"
            size={36}
          />
        </div>
      </section>

      <section
        className="border-y border-[#E7E5E4] bg-[#F7F6F2] px-5 py-14 sm:px-8 sm:py-16 lg:px-11 lg:py-20"
        id="categories"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end lg:mb-12">
            <div>
              <p className="text-xs font-bold tracking-[0.24em] text-emerald-800 sm:text-sm">
                A GOOD PLACE TO START
              </p>
              <h2 className="mt-4 text-4xl font-normal tracking-tight text-stone-900 sm:mt-5 sm:text-5xl lg:text-[4rem]">
                Find your{" "}
                <span className="font-serif italic text-emerald-800">
                  something.
                </span>
              </h2>
            </div>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-base font-normal text-stone-700 transition hover:text-emerald-800 sm:text-lg"
            >
              Shop all categories{" "}
              <ArrowUpRight
                aria-hidden="true"
                size={18}
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-7">
            {categories.slice(0, 4).map((category, index) => (
              <a
                key={category?.name}
                href={`#${category?.name}`}
                className="group relative isolate aspect-[1.45] overflow-hidden border border-stone-300/70 bg-stone-200 transition-colors duration-300 hover:border-emerald-900/30 hover:bg-stone-300 sm:aspect-[1.35]"
              >
                <img
                  src={category?.image?.url}
                  alt={category?.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-stone-950/10 to-stone-950/15 transition-colors duration-300 group-hover:from-stone-950/70" />
                <span className="absolute left-5 top-5 text-xs font-medium tracking-[0.16em] text-white/85 sm:left-7 sm:top-7">
                  0{index + 1}
                </span>
                <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-white group-hover:bg-white group-hover:text-stone-900 sm:right-7 sm:top-7">
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                  />
                </span>
                <span className="absolute bottom-5 left-5 font-serif text-3xl font-normal tracking-tight text-white sm:bottom-7 sm:left-7 sm:text-4xl lg:text-5xl">
                  {category?.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
        id="featured"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">
              THE GOOD FINDS
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
              Currently{" "}
              <span className="font-serif italic text-emerald-800">
                loving.
              </span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 transition hover:text-emerald-800"
          >
            See everything{" "}
            <ArrowUpRight
              aria-hidden="true"
              size={15}
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <article key={product?.name}>
              <a
                href="#product"
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100"
              >
                <img
                  src={product?.images?.[0]?.url}
                  alt={product?.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {product?.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#C9A227] px-3 py-1.5 text-[10px] font-medium text-white sm:left-4 sm:top-4">
                    {product?.badge}
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-900 transition group-hover:bg-[#064E3B] group-hover:text-white sm:bottom-4 sm:right-4"
                >
                  <Plus size={20} />
                </span>
              </a>
              <div className="flex justify-between gap-2 pt-3">
                <div>
                  <h3 className="text-sm font-medium text-stone-900 sm:text-base">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">
                    {product?.category?.name}
                  </p>
                </div>
                <span className="whitespace-nowrap text-sm text-stone-700">
                  {product.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="bg-emerald-900 px-5 py-16 text-center text-white sm:px-8 sm:py-24"
        id="about"
      >
        <Sparkle
          className="text-emerald-200"
          aria-hidden="true"
          size={30}
        />
        <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-emerald-200">
          LESS SCROLLING, MORE FINDING
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
          Little discoveries.
          <br />
          <span className="font-serif italic text-emerald-200">
            Big everyday joy.
          </span>
        </h2>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-4 rounded-full bg-white px-6 py-3 text-sm font-medium text-emerald-950 transition hover:bg-emerald-100"
        >
          Get to know us{" "}
          <ArrowUpRight
            aria-hidden="true"
            size={18}
          />
        </Link>
      </section>
    </main>
  );
}

export default Home;
