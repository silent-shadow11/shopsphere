function SetLoading({ message = 'Getting everything ready…' }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-5 py-16" role="status" aria-live="polite">
      <div className="flex w-full max-w-md flex-col items-center border border-stone-200 bg-white px-8 py-12 text-center shadow-sm sm:px-12">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-900/15 bg-emerald-50">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-800" />
          <span className="font-serif text-xl italic text-emerald-900">S</span>
        </span>
        <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-emerald-800">SHOPSPHERE</p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight text-stone-900">Just a moment</h1>
        <p className="mt-2 text-sm text-stone-500">{message}</p>
      </div>
      <span className="sr-only">Loading</span>
    </main>
  )
}

export default SetLoading
