const overviewCards = [
  { label: 'Total sales', value: '—', note: 'Sales summary' },
  { label: 'Orders', value: '—', note: 'Orders to review' },
  { label: 'Products', value: '—', note: 'Items in your store' },
  { label: 'Customers', value: '—', note: 'Customer accounts' },
]

const adminLinks = [
  { title: 'Manage products', description: 'Add new items, update details, and organize categories.', href: '#admin-products', action: 'View products' },
  { title: 'Review orders', description: 'Track recent purchases and update fulfillment status.', href: '#admin-orders', action: 'View orders' },
  { title: 'Customer accounts', description: 'Review account details and support customer requests.', href: '#admin-customers', action: 'View customers' },
]

function AdminHome() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-6 border-b border-stone-300 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-emerald-800">SHOPSPHERE ADMIN</p>
            <h1 className="mt-3 text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">Store <span className="font-serif italic text-emerald-800">overview.</span></h1>
            <p className="mt-3 text-sm text-stone-600">Manage your store and review its latest activity.</p>
          </div>
          <a href="#admin-products" className="inline-flex w-fit items-center gap-3 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800">Add a product <span aria-hidden="true">↗</span></a>
        </header>

        <section aria-label="Store statistics" className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {overviewCards.map((card) => (
            <article key={card.label} className="border border-stone-200 bg-white p-5 sm:p-6">
              <p className="text-sm text-stone-500">{card.label}</p>
              <p className="mt-5 text-3xl font-medium tracking-tight text-stone-900">{card.value}</p>
              <p className="mt-2 text-xs text-stone-400">{card.note}</p>
            </article>
          ))}
        </section>

        <section className="border border-stone-200 bg-white p-6 sm:p-8" aria-labelledby="activity-heading">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">STORE ACTIVITY</p>
              <h2 id="activity-heading" className="mt-2 text-2xl font-medium tracking-tight text-stone-900">Recent orders</h2>
            </div>
            <a href="#admin-orders" className="text-sm font-medium text-stone-700 transition hover:text-emerald-800">View all orders <span aria-hidden="true">↗</span></a>
          </div>
          <div className="mt-6 flex min-h-40 flex-col items-center justify-center border-t border-stone-200 py-8 text-center">
            <span aria-hidden="true" className="text-2xl text-emerald-800">✳</span>
            <p className="mt-3 text-sm font-medium text-stone-800">Your recent orders will appear here.</p>
            <p className="mt-1 text-xs text-stone-500">Connect the orders data source to see store activity.</p>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="management-heading">
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">QUICK ACCESS</p>
            <h2 id="management-heading" className="mt-2 text-2xl font-medium tracking-tight text-stone-900">Manage your store</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {adminLinks.map((link) => (
              <a key={link.title} href={link.href} className="group border border-stone-200 bg-white p-5 transition-colors duration-300 hover:border-emerald-900/30 hover:bg-emerald-50/40 sm:p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-lg text-stone-700 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-emerald-800 group-hover:text-emerald-800" aria-hidden="true">↗</span>
                <h3 className="mt-6 text-lg font-medium text-stone-900">{link.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">{link.description}</p>
                <p className="mt-5 text-sm font-medium text-emerald-800">{link.action}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminHome
