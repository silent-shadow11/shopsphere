function Login() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <section id="login" className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden border border-stone-200 bg-[#f7f6f2] md:grid-cols-2">
        <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-stone-200 p-8 text-white sm:p-12 md:min-h-[520px]">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85"
            alt="A curated selection of timeless fashion"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-stone-950/35" />
          <p className="relative text-xs font-semibold tracking-[0.24em]">SHOPSPHERE — THE EVERYDAY EDIT</p>
          <p className="relative max-w-xs font-serif text-3xl italic leading-snug sm:text-4xl">Find the pieces that feel like you.</p>
        </div>

        <div className="flex items-center p-6 sm:p-10 lg:p-14">
          <div className="w-full">
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">WELCOME BACK</p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-stone-900">Log in to ShopSphere</h2>
            <p className="mt-2 text-sm text-stone-500">Pick up where you left off.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-email" className="text-sm font-medium text-stone-700">Email address</label>
                <input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/10" />
              </div>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="login-password" className="text-sm font-medium text-stone-700">Password</label>
                  <a href="#forgot-password" className="text-xs font-medium text-emerald-800 transition hover:text-emerald-950">Forgot password?</a>
                </div>
                <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/10" />
              </div>
              <button type="submit" className="w-full rounded-full bg-stone-900 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2">Log in</button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500">New to ShopSphere? <a href="#signin" className="font-medium text-emerald-800 transition hover:text-emerald-950">Create an account</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
