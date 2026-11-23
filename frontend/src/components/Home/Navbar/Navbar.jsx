function Navbar() {
  return (
    <header className="w-full border-b border-stone-200 bg-white">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-stone-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">S</span>
          ShopSphere
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
          <a className="transition hover:text-emerald-700" href="#shop">Shop</a>
          <a className="transition hover:text-emerald-700" href="#categories">Categories</a>
          <a className="transition hover:text-emerald-700" href="#about">About</a>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Search" className="hidden rounded-full p-2 text-stone-700 transition hover:bg-stone-100 sm:inline-flex">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
              <circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" strokeLinecap="round" />
            </svg>
          </button>
          <a href="#login" className="hidden text-sm font-medium text-stone-700 transition hover:text-emerald-700 sm:inline">Account</a>
          <a href="#bag" className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800">
            Bag <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-xs">0</span>
          </a>
          <button aria-label="Open menu" className="rounded-full p-2 text-stone-700 transition hover:bg-stone-100 md:hidden">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
