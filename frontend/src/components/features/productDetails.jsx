import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchproduct = async () => {
      const response = await api.get(`users/product/${id}`);
      setProduct(response?.data?.data);
    };
    fetchproduct();
  }, [id]);

  const images = product?.images ?? [];
  const regularPrice = Number(product?.price ?? 0);
  const discountPrice = Number(product?.discount_price ?? 0);
  const hasDiscount = discountPrice > 0 && discountPrice < regularPrice;
  const finalPrice = hasDiscount ? discountPrice : regularPrice;
  const savings = hasDiscount ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100) : 0;
  const productName=product?.name
  const productCategory=product?.category?.name
  const productRating=product?.rating
  const productDescription=product?.description

  return (
    <main className="min-h-screen bg-[#F7F6F2] px-5 py-8 text-[#1C1917] sm:px-8 sm:py-12">
      <section className="mx-auto max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[#78716C]"
        >
          <Link
            to="/shop"
            className="transition hover:text-[#064E3B]"
          >
            Shop
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            to={`/${productCategory}`}
            className="transition hover:text-[#064E3B]"
          >
            {product?.category?.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#1C1917]">{productName}</span>
        </nav>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-16">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <div key={image.public_id || image.url} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-200">
                <img
                  src={image.url}
                  alt={`${productName || "Product"} view ${index + 1}`}
                  className="size-full object-cover"
                />
                {index === 0 && (
                  <>
                    <span className="absolute left-3 top-3 bg-[#C9A227] px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-white">
                      BESTSELLER
                    </span>
                    <button
                      type="button"
                      aria-label={`Save ${productName || "product"}`}
                      className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/95 text-xl text-[#064E3B] shadow-sm transition hover:bg-[#064E3B] hover:text-white"
                    >
                      ♡
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="lg:pt-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#064E3B]">
              {productCategory}
            </p>
            <div className="mt-3">
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
                {productName}
              </h1>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-[#D7E7E0] bg-[#EEF7F2] px-4 py-3">
              <p className="text-3xl font-semibold tracking-tight text-[#064E3B] sm:text-4xl">
                ₹{finalPrice.toLocaleString("en-IN")}
              </p>
              {hasDiscount && (
                <>
                  <p className="text-sm text-[#78716C] line-through">₹{regularPrice.toLocaleString("en-IN")}</p>
                  <span className="rounded-full bg-[#064E3B] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                    SAVE {savings}%
                  </span>
                </>
              )}
              <span className="w-full text-xs text-[#78716C]">Inclusive of all taxes</span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="tracking-[0.12em] text-[#C9A227]">{"★".repeat(productRating)}</span>
              <a
                href="#reviews"
                className="text-[#78716C] underline decoration-[#D6D3D1] underline-offset-4 hover:text-[#064E3B]"
              >
                {productRating} · 28 reviews
              </a>
            </div>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#57534E]">
                {productDescription}
            </p>

            <div className="mt-8 border-y border-[#E7E5E4] py-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  Colour{" "}
                  <span className="font-normal text-[#78716C]">· Chestnut</span>
                </p>
                <button
                  type="button"
                  className="text-xs font-medium text-[#064E3B] underline underline-offset-4"
                >
                  Size guide
                </button>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  aria-label="Chestnut"
                  className="grid size-10 place-items-center rounded-full border border-[#064E3B] bg-white"
                >
                  <span className="size-7 rounded-full bg-[#8B5A3C]" />
                </button>
                <button
                  type="button"
                  aria-label="Black"
                  className="grid size-10 place-items-center rounded-full border border-transparent bg-white"
                >
                  <span className="size-7 rounded-full bg-[#292524]" />
                </button>
                <button
                  type="button"
                  aria-label="Cream"
                  className="grid size-10 place-items-center rounded-full border border-transparent bg-white"
                >
                  <span className="size-7 rounded-full border border-[#D6D3D1] bg-[#E7DDCE]" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <div className="flex h-14 items-center border border-[#D6D3D1] bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="grid h-full w-12 place-items-center text-lg text-[#57534E] hover:text-[#064E3B]"
                >
                  −
                </button>
                <span className="grid h-full w-9 place-items-center text-sm font-medium">
                  1
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="grid h-full w-12 place-items-center text-lg text-[#57534E] hover:text-[#064E3B]"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="h-14 flex-1 bg-[#064E3B] px-5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#053c2e]"
              >
                Add to bag · ₹{finalPrice.toLocaleString("en-IN")}
              </button>
            </div>

            <div className="mt-7 divide-y divide-[#E7E5E4] border-y border-[#E7E5E4]">
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium marker:content-none">
                  Thoughtful details
                  <span className="text-lg font-normal text-[#78716C] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pt-3 pr-8 text-sm leading-6 text-[#78716C]">
                  Full-grain leather, cotton canvas lining, and an interior zip
                  pocket.
                </p>
              </details>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium marker:content-none">
                  Shipping &amp; returns
                  <span className="text-lg font-normal text-[#78716C] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pt-3 pr-8 text-sm leading-6 text-[#78716C]">
                  Complimentary shipping on orders over $75. Easy 30-day
                  returns.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
