import { useState } from "react";
import api from "../../../lib/axios";

function OTPVerify({ email = "you@example.com", onVerify, onResend }) {
  const [otp, setOtp] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (otp.length === 6) onVerify?.(otp);
    const response=await api.post("users/Verifyotp")
    console.log(response);
    
  }

  return (
    <section
      className="grid min-h-screen place-items-center bg-[#f7f6f2] px-5 py-8 text-stone-900"
      aria-labelledby="otp-title"
    >
      <div className="w-full max-w-md border border-stone-200 bg-white p-7 text-center shadow-[0_18px_50px_rgb(28_25_23_/_7%)] sm:p-12">
        <div
          className="mx-auto mb-6 grid size-12 place-items-center rounded-full bg-emerald-950 font-serif text-2xl text-white"
          aria-hidden="true"
        >
          S
        </div>
        <p className="mb-2 text-[0.7rem] font-bold tracking-[0.2em] text-emerald-800">
          SECURE YOUR ACCOUNT
        </p>
        <h1 id="otp-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Verify your email
        </h1>
        <p className="mt-3 mb-8 text-sm leading-6 text-stone-500">
          Enter the 6-digit code we sent to{" "}
          <strong className="font-semibold text-stone-700">{email}</strong>.
        </p>

        <form className="text-left" onSubmit={handleSubmit}>
          <label
            htmlFor="otp-code"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Verification code
          </label>
          <input
            id="otp-code"
            name="otp"
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-center text-2xl tracking-[0.65em] text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="••••••"
            value={otp}
            onChange={(event) =>
              setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            aria-describedby="otp-hint"
            required
          />
          <p id="otp-hint" className="mt-2 mb-6 text-xs text-stone-400">
            The code is valid for a limited time.
          </p>
          <button
            className="w-full rounded-full bg-stone-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 disabled:cursor-not-allowed disabled:opacity-45"
            type="submit"
            disabled={otp.length !== 6}
          >
            Verify email
          </button>
        </form>

        <p className="mt-6 text-sm text-stone-500">
          Didn’t receive a code?{" "}
          <button
            className="font-semibold text-emerald-800 hover:text-emerald-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            type="button"
            onClick={onResend}
          >
            Resend code
          </button>
        </p>
      </div>
    </section>
  );
}

export default OTPVerify;
