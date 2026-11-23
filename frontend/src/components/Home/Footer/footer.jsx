function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 text-stone-700">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <a href="#home" className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-stone-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">S</span>
            ShopSphere
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone-500">Thoughtful finds for everyday living. Discover pieces you’ll love and keep close.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-stone-900">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a className="transition hover:text-emerald-700" href="#shop">Shop all</a></li>
            <li><a className="transition hover:text-emerald-700" href="#categories">Categories</a></li>
            <li><a className="transition hover:text-emerald-700" href="#about">Our story</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-stone-900">Need a hand?</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a className="transition hover:text-emerald-700" href="#contact">Contact us</a></li>
            <li><a className="transition hover:text-emerald-700" href="#shipping">Shipping &amp; returns</a></li>
            <li><a className="transition hover:text-emerald-700" href="#faq">FAQs</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-stone-200 px-5 py-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
        <div className="flex gap-5">
          <a className="transition hover:text-emerald-700" href="#privacy">Privacy</a>
          <a className="transition hover:text-emerald-700" href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
