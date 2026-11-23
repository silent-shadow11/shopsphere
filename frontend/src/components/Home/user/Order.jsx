function Order({ orders = [] }) {
  return (
    <main id="orders" className="min-h-[55vh] bg-[#f7f6f2] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-5 border-b border-stone-300 pb-6 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">YOUR SHOPSPHERE</p>
            <h1 className="mt-3 text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">Order <span className="font-serif italic text-emerald-800">history.</span></h1>
            <p className="mt-3 text-sm text-stone-500">Keep track of the good things heading your way.</p>
          </div>
          <a href="#featured" className="inline-flex w-fit items-center gap-3 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800">Continue shopping <span aria-hidden="true">↗</span></a>
        </header>

        {orders.length === 0 ? (
          <section className="border border-stone-200 bg-white px-6 py-16 text-center sm:py-20">
            <span aria-hidden="true" className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 font-serif text-2xl italic text-emerald-800">S</span>
            <h2 className="mt-5 text-xl font-medium text-stone-900">No orders just yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">Once you place an order, its status and details will show up here.</p>
            <a href="#featured" className="mt-6 inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-800 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white">Explore the collection</a>
          </section>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article key={order.id} className="border border-stone-200 bg-white p-5 sm:p-7">
                <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-center">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:gap-10">
                    <div><p className="text-xs text-stone-500">Order</p><p className="mt-1 text-sm font-medium text-stone-900">{order.id}</p></div>
                    <div><p className="text-xs text-stone-500">Placed</p><p className="mt-1 text-sm font-medium text-stone-900">{order.date}</p></div>
                    <div><p className="text-xs text-stone-500">Total</p><p className="mt-1 text-sm font-medium text-stone-900">{order.total}</p></div>
                  </div>
                  <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">{order.status}</span>
                </div>
                <div className="flex flex-col justify-between gap-3 pt-5 sm:flex-row sm:items-center">
                  <p className="text-sm text-stone-600">{order.itemSummary}</p>
                  {order.href && <a href={order.href} className="text-sm font-medium text-emerald-800 transition hover:text-emerald-950">View order <span aria-hidden="true">↗</span></a>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Order
