import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const profile = useSelector((state) => state.auth.profile);
  const username = profile?.username || "";
  const email = profile?.email || "";
  const fullname = profile?.fullname || "";
  const avater = profile?.avater || "";

  return (
    <main className="min-h-screen bg-[#F7F6F2] px-5 py-10 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#064E3B]">
          YOUR ACCOUNT
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl">
          My <span className="font-serif italic text-[#064E3B]">profile.</span>
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="border border-[#E7E5E4] bg-white p-6">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start">
              <img
                src={avater}
                alt="Profile avatar"
                className="size-20 rounded-full object-cover ring-4 ring-[#F7F6F2]"
              />
              <div>
                <h2 className="text-xl font-medium text-[#1C1917]">
                  {username}
                </h2>
                <p className="mt-1 text-sm text-[#78716C]">{email}</p>
              </div>
            </div>

            <nav
              className="mt-8 space-y-1 border-t border-[#E7E5E4] pt-5"
              aria-label="Profile navigation"
            >
              <Link to="/profile"
                className="flex items-center gap-3 bg-[#F7F6F2] px-4 py-3 text-sm font-medium text-[#064E3B]"
              >
                Profile details
              </Link>
              <Link to='/myorder'
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#78716C] transition hover:bg-[#F7F6F2] hover:text-[#064E3B]"
              >
                My orders
              </Link>
              <Link
                to="/savedAdress"
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#78716C] transition hover:bg-[#F7F6F2] hover:text-[#064E3B]"
              >
                Saved addresses
              </Link>
            </nav>
          </aside>

          <div className="space-y-6">
            <section
              id="profile"
              className="border border-[#E7E5E4] bg-white p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                    PERSONAL DETAILS
                  </p>
                  <h2 className="mt-2 text-2xl font-medium text-[#1C1917]">
                    Profile information
                  </h2>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-[#064E3B] px-4 py-2 text-sm font-medium text-[#064E3B] transition hover:bg-[#064E3B] hover:text-white"
                >
                  Edit profile
                </button>
              </div>

              <dl className="mt-8 grid gap-6 border-t border-[#E7E5E4] pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-[#78716C]">
                    FULL NAME
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-[#1C1917]">
                    {fullname}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-[#78716C]">
                    EMAIL ADDRESS
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-[#1C1917]">
                    {email}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-[#78716C]">
                    PHONE NUMBER
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-[#1C1917]">
                    -
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-[#78716C]">
                    MEMBER SINCE
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-[#1C1917]">
                    March 2026
                  </dd>
                </div>
              </dl>
            </section>

            <section
              id="orders"
              className="border border-[#E7E5E4] bg-[#064E3B] p-6 text-white sm:p-8"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                SHOPSPHERE REWARDS
              </p>
              <h2 className="mt-2 text-2xl font-medium">
                Your next favourite find awaits.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/75">
                Keep exploring thoughtful pieces made for everyday life.
              </p>
              <a
                href="#shop"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[#064E3B] transition hover:bg-[#F7F6F2]"
              >
                Explore the collection
              </a>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
