function Signout() {
  function handleSignout() {
    // Connect this action to the authentication logout flow when it is available.
    const response=await api.
  }

  return (
    <section id="signout" className="bg-[#f7f6f2] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 border border-stone-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.6">
              <path d="M10 17l5-5-5-5M15 12H3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">YOUR ACCOUNT</p>
            <h2 className="mt-1 text-xl font-medium tracking-tight text-stone-900">Ready to sign out?</h2>
            <p className="mt-1 text-sm text-stone-500">You can sign back in whenever you’re ready.</p>
          </div>
        </div>
        <button type="button" onClick={handleSignout} className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-800 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2">
          Sign out <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  )
}

export default Signout
