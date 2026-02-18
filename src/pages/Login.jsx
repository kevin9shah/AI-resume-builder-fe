import { useState } from "react"

const Login = () => {
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get("state")

  const [state, setState] = useState(urlState || "login")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-400 via-green-500 to-lime-400">

      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-96 text-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-8 py-6 shadow-2xl"
      >
        <h1 className="text-white text-3xl mt-4 font-semibold">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-white/80 text-sm mt-2">
          Please sign in to continue
        </p>

        {/* Name Field (Register Only) */}
        {state !== "login" && (
          <div className="mt-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full h-12 px-4 rounded-full bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-green-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full h-12 px-4 rounded-full bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-green-300"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mt-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full h-12 px-4 rounded-full bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-green-300"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="mt-3 text-left">
          <button
            type="button"
            className="text-sm text-green-100 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition duration-300 shadow-lg"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        {/* Toggle Login/Register */}
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-white/80 text-sm mt-4 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-green-200 hover:underline ml-1">
            Click here
          </span>
        </p>
      </form>

      {/* Soft Glow Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[500px] h-[200px] bg-white/30 rounded-full blur-3xl" />
        <div className="absolute right-10 bottom-10 w-[300px] h-[150px] bg-white/20 rounded-full blur-2xl" />
      </div>

    </div>
  )
}

export default Login
