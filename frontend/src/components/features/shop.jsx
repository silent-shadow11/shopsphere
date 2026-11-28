import { Plus, SlidersHorizontal } from "@phosphor-icons/react";
import api from "../../lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../redux/slice/AuthSilce";

function Shop() {
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const dispatch=useDispatch()
  const handleaddTocart = async (product) => {
    console.log(product);
    const productId=product?._id
    try {
      const response=await api.post("/cart/addTocart", { productId }); 
      dispatch(setCart(response.data));
      toast.success("🛒 Product Added to Cart!");
    } catch (error) {
      dispatch(setCart([]));
      toast.error("❌ Failed to Add to Cart"); 
    }
  };
  return (
    <main className="min-h-screen bg-[#F7F6F2] px-5 py-10 text-[#1C1917] sm:px-8 sm:py-16">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#064E3B]">
          THE SHOPSPHERE EDIT
        </p>
        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              Find your{" "}
              <span className="font-serif italic text-[#064E3B]">
                good stuff.
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#78716C]">
              Thoughtfully chosen pieces for the everyday moments that matter
              most.
            </p>
          </div>
          <p className="text-sm text-[#78716C]">
            Showing {products?.length} carefully selected pieces
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-y border-[#E7E5E4] py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="category-scrollbar flex gap-2 overflow-x-auto pb-2 lg:pb-1">
            {categories.map((category, index) => (
              <button
                key={category._id}
                type="button"
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  index === 0 ?
                    "bg-[#064E3B] text-white"
                  : "border border-[#E7E5E4] bg-white text-[#78716C] hover:border-[#064E3B] hover:text-[#064E3B]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-4 py-2 text-sm font-medium text-[#1C1917] transition hover:border-[#064E3B] hover:text-[#064E3B]"
          >
            <SlidersHorizontal
              aria-hidden="true"
              size={17}
            />
            Filter & sort
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product._id}>
              <div className="group relative">
                <Link
                  to={`/productDetails/${product._id}`}
                  className="block aspect-[4/5] overflow-hidden bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#064E3B]"
                >
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 bg-[#C9A227] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white sm:left-4 sm:top-4">
                      {product.badge}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={() => handleaddTocart(product)}
                  aria-label={`Add ${product.name} to cart`}
                  className="absolute bottom-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-white text-[#064E3B] shadow-sm transition hover:bg-[#064E3B] hover:text-white focus-visible:bg-[#064E3B] focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064E3B] sm:bottom-4 sm:right-4"
                >
                  <Plus aria-hidden="true" size={20} />
                </button>
              </div>
              <div className="flex justify-between gap-3 pt-3">
                <div>
                  <p className="text-sm font-medium text-[#1C1917]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-[#78716C]">
                    {product.category.name}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm font-medium text-[#1C1917]">
                  {product.discount_price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Shop;
