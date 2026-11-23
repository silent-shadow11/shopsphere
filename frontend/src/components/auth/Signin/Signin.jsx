import { useEffect, useState } from "react";

function Signin() {
  const fieldClassName =
    "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/10";
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fulname, setfullname] = useState(null);
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [avatarFile]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section
      id="signin"
      className="bg-[#f7f6f2] px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl overflow-hidden border border-stone-200 bg-white shadow-sm md:grid-cols-2">
        <div className="flex flex-col justify-between bg-emerald-950 p-8 text-white sm:p-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-emerald-200">
              WELCOME TO SHOPSPHERE
            </p>
            <h2 className="mt-6 text-4xl font-medium tracking-tight sm:text-5xl">
              Good things
              <br />
              start{" "}
              <span className="font-serif italic text-emerald-200">here.</span>
            </h2>
          </div>
          <p className="mt-12 max-w-sm text-sm leading-6 text-emerald-100/80">
            Create your account to save your finds and make every visit feel a
            little more like yours.
          </p>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-800">
            YOUR ACCOUNT
          </p>
          <h3 className="mt-2 text-3xl font-medium tracking-tight text-stone-900">
            Create your account
          </h3>
          <p className="mt-2 text-sm text-stone-500">
            Create an account to save your finds and check out faster.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-stone-700"
                
              >
                Username
              </label>
              <input
                className={fieldClassName}
                id="username"
                name="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                type="text"
                autoComplete="username"
                placeholder="Your username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-stone-700"
              >
                Email address
              </label>
              <input
                className={fieldClassName}
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-stone-700"
              >
                Password
              </label>
              <input
                className={fieldClassName}
                id="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="avater"
                className="text-sm font-medium text-stone-700"
              >
                Avatar image
              </label>
              <input
                className={`${fieldClassName} file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-xs file:font-medium file:text-emerald-800 hover:file:bg-emerald-100`}
                id="avater"
                name="avater"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setAvatarFile(event.target.files?.[0] ?? null)
                }
                required
              />
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Selected avatar preview"
                  className="mt-3 h-16 w-16 rounded-full border border-stone-200 object-cover"
                />
              )}
            </div>
            <div>
              <label
                htmlFor="role"
                className="text-sm font-medium text-stone-700"
              >
                Account role
              </label>
              <select
                className={fieldClassName}
                id="role"
                name="role"
                defaultValue="user"
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-stone-900 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signin;
