import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const isLogin = useSelector((state) => state.auth.login);
  const profile = useSelector((state) => state.auth.profile);
  const profileName = profile?.fullname || profile?.username || "My profile";
  const profileInitial = profileName.charAt(0).toUpperCase();
  const role = profile?.role || "user";
  return (
    <header className="w-full border-b border-stone-200 bg-white">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-stone-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#064E3B] text-sm font-bold text-white">S</span>
          ShopSphere
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
          <Link to='/shop' className="transition hover:text-[#064E3B]">Shop</Link>
          <Link to="/categories" className="transition hover:text-[#064E3B]" >Categories</Link>
          <a className="transition hover:text-[#064E3B]" href="#about">About</a>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Search" className="hidden rounded-full p-2 text-stone-700 transition hover:bg-stone-100 sm:inline-flex">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
              <circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" strokeLinecap="round" />
            </svg>
          </button>
          {!isLogin ? (
            <Link to="/login" className="hidden text-sm font-medium text-stone-700 transition hover:text-[#064E3B] sm:inline">
              Account
            </Link>
          ) : (
            <Link to="/profile"
              className="hidden rounded-full border border-[#E7E5E4] bg-[#F7F6F2] p-1.5 transition hover:border-[#064E3B]/30 hover:bg-white sm:inline-flex"
              aria-label={`Open ${profileName} profile`}
            >
              {profile?.avater ? (
                <img
                  src={profile.avater}
                  alt=""
                  className="size-7 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-7 items-center justify-center rounded-full bg-[#064E3B] text-xs font-semibold text-white">
                  {profileInitial}
                </span>
              )}
            </Link>
          )}
          {isLogin && (
            <Link
              to="/signout"
              className="hidden rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 sm:inline-flex"
            >
              Sign out
            </Link>
          )}
          {role === "admin" && (
            <Link
              to="/admin"
              className="hidden rounded-full border border-[#064E3B] px-4 py-2 text-sm font-medium text-[#064E3B] transition hover:bg-[#064E3B] hover:text-white sm:inline-flex"
            >
              Admin
            </Link>
          )}
          <Link to="/bag" className="inline-flex items-center gap-2 rounded-full bg-[#064E3B] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#022C22]">
            Bag <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-xs">0</span>
          </Link>
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
