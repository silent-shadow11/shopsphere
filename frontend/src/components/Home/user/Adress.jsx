import { MapPin, PencilSimple, Plus, Trash } from "@phosphor-icons/react";

const addresses = [
  {
    label: "Home",
    name: "Alex Morgan",
    lines: ["24 Willow Lane", "Brooklyn, NY 11201", "United States"],
    phone: "+1 555 014 2789",
    primary: true,
  },
  {
    label: "Work",
    name: "Alex Morgan",
    lines: ["180 Hudson Street, Suite 302", "New York, NY 10013", "United States"],
    phone: "+1 555 014 2789",
    primary: false,
  },
];

function Adress() {
  return (
    <main className="min-h-screen bg-[#F7F6F2] px-5 py-10 text-[#1C1917] sm:px-8 sm:py-16">
      <section className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-5 border-b border-[#E7E5E4] pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#064E3B]">YOUR ACCOUNT</p>
            <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
              Saved <span className="font-serif italic text-[#064E3B]">addresses.</span>
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#78716C]">
              Keep your delivery details ready for a smoother checkout.
            </p>
          </div>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#064E3B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#022C22]">
            <Plus aria-hidden="true" size={18} />
            Add new address
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {addresses.map((address) => (
            <article key={address.label} className="relative border border-[#E7E5E4] bg-white p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-[#F7F6F2] text-[#064E3B]">
                    <MapPin aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <h2 className="font-medium text-[#1C1917]">{address.label}</h2>
                    {address.primary && (
                      <span className="mt-1 inline-block bg-[#C9A227] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white">
                        DEFAULT ADDRESS
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button type="button" aria-label={`Edit ${address.label} address`} className="grid size-9 place-items-center rounded-full text-[#78716C] transition hover:bg-[#F7F6F2] hover:text-[#064E3B]">
                    <PencilSimple aria-hidden="true" size={18} />
                  </button>
                  <button type="button" aria-label={`Delete ${address.label} address`} className="grid size-9 place-items-center rounded-full text-[#78716C] transition hover:bg-red-50 hover:text-red-600">
                    <Trash aria-hidden="true" size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-7 border-t border-[#E7E5E4] pt-5 text-sm leading-6 text-[#78716C]">
                <p className="font-medium text-[#1C1917]">{address.name}</p>
                {address.lines.map((line) => <p key={line}>{line}</p>)}
                <p className="mt-3">{address.phone}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 border border-dashed border-[#C9A227]/60 bg-white/50 p-6 text-center sm:p-8">
          <p className="font-serif text-xl italic text-[#1C1917]">Need an address for someone special?</p>
          <p className="mt-2 text-sm text-[#78716C]">Add another delivery location whenever you need it.</p>
        </div>
      </section>
    </main>
  );
}

export default Adress;
