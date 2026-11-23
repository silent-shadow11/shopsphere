import { useState } from 'react'

const initialItems = [
  { id: 1, name: 'Everyday leather tote', category: 'Accessories', price: 89, quantity: 1, image: 'photo-1548036328-c9fa89d128fa' },
  { id: 2, name: 'Cloud-knit pullover', category: 'Clothing', price: 64, quantity: 1, image: 'photo-1576566588028-4147f3842f27' },
]

function Cart() {
  const [items, setItems] = useState(initialItems)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function updateQuantity(id, change) {
    setItems((currentItems) => currentItems
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0))
  }

  function removeItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  return (
    <main id="bag" className="min-h-[60vh] bg-[#f7f6f2] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-stone-300 pb-6 sm:mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">YOUR GOOD FINDS</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">Shopping <span className="font-serif italic text-emerald-800">bag.</span></h1>
          <p className="mt-3 text-sm text-stone-500">{items.length} {items.length === 1 ? 'item' : 'items'} in your bag</p>
        </div>

        {items.length === 0 ? (
          <div className="border border-stone-200 bg-white px-6 py-16 text-center">
            <p className="font-serif text-2xl italic text-stone-800">Your bag is taking a little breather.</p>
            <p className="mt-2 text-sm text-stone-500">Find something lovely to bring home.</p>
            <a href="#featured" className="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800">Continue shopping</a>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="divide-y divide-stone-200 border-y border-stone-200 bg-white px-5 sm:px-7">
              {items.map((item) => (
                <article key={item.id} className="flex gap-4 py-5 sm:gap-6 sm:py-7">
                  <img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=400&q=80`} alt={item.name} className="h-28 w-24 shrink-0 object-cover sm:h-36 sm:w-28" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-xs text-stone-500">{item.category}</p>
                      <h2 className="mt-1 text-base font-medium text-stone-900 sm:text-lg">{item.name}</h2>
                      <button type="button" onClick={() => removeItem(item.id)} className="mt-3 text-xs text-stone-500 underline decoration-stone-300 underline-offset-4 transition hover:text-red-700">Remove</button>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                      <div className="inline-flex items-center border border-stone-300">
                        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, -1)} className="h-9 w-9 text-stone-600 transition hover:bg-stone-100">−</button>
                        <span className="w-8 text-center text-sm text-stone-800">{item.quantity}</span>
                        <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, 1)} className="h-9 w-9 text-stone-600 transition hover:bg-stone-100">+</button>
                      </div>
                      <p className="text-sm font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit border border-stone-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-medium text-stone-900">Order summary</h2>
              <div className="mt-5 space-y-3 border-b border-stone-200 pb-5 text-sm">
                <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-stone-600"><span>Shipping</span><span>{subtotal >= 75 ? 'Free' : 'Calculated at checkout'}</span></div>
              </div>
              <div className="flex justify-between py-5 text-base font-medium text-stone-900"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
              <button type="button" className="w-full rounded-full bg-stone-900 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-emerald-800">Continue to checkout</button>
              <a href="#featured" className="mt-4 block text-center text-sm text-stone-500 transition hover:text-emerald-800">Continue shopping</a>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

export default Cart
