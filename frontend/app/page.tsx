import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              TF
            </div>
            <span className="text-2xl font-bold text-gray-800">
              TaskFlow
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="px-5 py-2 rounded-lg text-gray-700 hover:text-blue-600 transition">
                Sign In
              </button>
            </Link>

            <Link href="/signup">
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="flex-1 flex items-center bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
            Organize Smarter.
            <br />
            <span className="text-blue-600">Achieve Faster.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            A modern task management app designed to keep you productive,
            focused, and organized every day.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/signup">
              <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-xl hover:bg-blue-700 hover:scale-105 transition duration-300">
                Create Free Account
              </button>
            </Link>

            <Link href="/login">
              <button className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-3">

          <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Quick Creation
            </h3>
            <p className="text-gray-600">
              Add tasks instantly with a clean and intuitive interface.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Smart Filters
            </h3>
            <p className="text-gray-600">
              Sort and filter tasks easily to stay organized.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Secure Data
            </h3>
            <p className="text-gray-600">
              Your tasks are private and protected with secure authentication.
            </p>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
