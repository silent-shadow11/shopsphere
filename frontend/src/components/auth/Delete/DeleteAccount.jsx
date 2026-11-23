import { useState } from 'react'

function DeleteAccount() {
  const [confirmed, setConfirmed] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <section id="delete-account" className="bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl border border-red-200 bg-red-50/50 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-700">ACCOUNT SETTINGS</p>
            <h2 className="mt-1 text-xl font-medium tracking-tight text-stone-900">Delete your account</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Deleting your account is permanent. Your profile and saved account details will be removed, and this action cannot be undone.</p>
          </div>
        </div>

        <form className="mt-6 border-t border-red-200 pt-5" onSubmit={handleSubmit}>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-stone-700">
            <input className="mt-1 h-4 w-4 shrink-0 accent-red-700" type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} required />
            <span>I understand that deleting my account is permanent.</span>
          </label>
          <button type="submit" disabled={!confirmed} className="mt-5 rounded-full bg-red-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45">
            Delete account
          </button>
        </form>
      </div>
    </section>
  )
}

export default DeleteAccount
