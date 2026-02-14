// /**
//  * Home/Landing page
//  */

// import Link from 'next/link'
// import Button from '@/components/ui/Button'

// export default function HomePage() {
//   return (
//     <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary-50 via-white to-blue-50">
//       {/* Header */}
//       <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
//         <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2 animate-fade-in">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg">
//                 {/* <svg
//                   className="h-6 w-6 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
//                   />
//                 </svg> */}
//               </div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
//                 TaskFlow
//               </h1>
//             </div>
//             <div className="flex items-center gap-3 animate-fade-in">
//               <Link href="/login">
//                 <Button variant="ghost">Sign In</Button>
//               </Link>
//               <Link href="/signup">
//                 <Button variant="primary">Get Started</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="flex-1">
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
//           <div className="text-center animate-slide-up">
//             <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
//               <span className="relative flex h-2 w-2">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
//                 <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
//               </span>
//               New: Real-time task sync
//             </div>

//             <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
//               Organize Your Tasks
//               <span className="block mt-2 bg-gradient-to-r from-primary-600 via-blue-600 to-primary-700 bg-clip-text text-transparent animate-bounce-subtle">
//                 Stay Productive
//               </span>
//             </h2>

//             <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 leading-relaxed">
//               A simple, secure, and efficient way to manage your daily tasks.
//               Create, organize, and track your to-dos with ease.
//             </p>

//             <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
//               <Link href="/signup">
//                 <Button variant="primary" size="lg" className="group relative overflow-hidden">
//                   <span className="relative z-10">Create Free Account</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 </Button>
//               </Link>
//               <Link href="/login">
//                 <Button variant="outline" size="lg" className="hover:shadow-lg transition-shadow">
//                   Sign In
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* Features */}
//           <div className="mt-32">
//             <div className="text-center mb-16 animate-fade-in">
//               <h3 className="text-3xl font-bold text-gray-900 mb-4">
//                 Everything you need to stay organized
//               </h3>
//               <p className="text-lg text-gray-600">
//                 Powerful features to help you manage tasks efficiently
//               </p>
//             </div>

//             <div className="grid gap-8 md:grid-cols-3">
//               <div className="group rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up border border-gray-100">
//                 <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg group-hover:scale-110 transition-transform">
//                   {/* <svg
//                     className="h-7 w-7 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 4v16m8-8H4"
//                     />
//                   </svg> */}
//                 </div>
//                 <h3 className="mb-3 text-xl font-bold text-gray-900">
//                   Quick Task Creation
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Add new tasks in seconds with our intuitive interface. No
//                   complexity, just simplicity.
//                 </p>
//               </div>

//               <div className="group rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up border border-gray-100" style={{ animationDelay: '0.1s' }}>
//                 <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform">
//                   {/* <svg
//                     className="h-7 w-7 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//                     />
//                   </svg> */}
//                 </div>
//                 <h3 className="mb-3 text-xl font-bold text-gray-900">
//                   Filter & Sort
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Organize your tasks by status, date, or title. Find what you
//                   need instantly.
//                 </p>
//               </div>

//               <div className="group rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up border border-gray-100" style={{ animationDelay: '0.2s' }}>
//                 <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
//                   {/* <svg
//                     className="h-7 w-7 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </svg> */}
//                 </div>
//                 <h3 className="mb-3 text-xl font-bold text-gray-900">
//                   Secure & Private
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Your tasks are yours alone. Secure authentication keeps your
//                   data safe and private.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
//         <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//           <p className="text-center text-sm text-gray-500">
//             © {new Date().getFullYear()} TaskFlow. Built for Hackathon Phase II.
//           </p>
//         </div>
//       </footer>
//     </div>
//   )
// }
/**
 * Beautiful Modern Landing Page
 * Enhanced for better responsiveness, animations, and visual appeal.
 */

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg animate-pulse" />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Link href="/login">
              <button className="px-5 py-2 rounded-xl font-medium transition-all duration-300 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 border border-gray-200">
                Sign In
              </button>
            </Link>

            <Link href="/signup">
              <button className="px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          
          {/* Badge */}
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-200 to-pink-200 text-indigo-700 font-medium animate-bounce shadow-sm">
            🚀 New: Real-time Sync Enabled
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
            Organize Your Tasks
            <span className="block mt-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Stay Productive Everyday
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
            A powerful, colorful and modern way to manage your daily workflow.
            Simple. Secure. Beautiful. Experience seamless task management with real-time collaboration.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <button className="relative px-8 py-4 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <span className="relative z-10">Create Free Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </button>
            </Link>

            <Link href="/login">
              <button className="px-8 py-4 text-lg font-semibold rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
                Sign In
              </button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {[
              {
                title: "Quick Task Creation",
                desc: "Add tasks instantly with a smooth and intuitive experience. Drag, drop, and organize effortlessly.",
                color: "from-indigo-500 to-purple-500",
                icon: "⚡",
              },
              {
                title: "Smart Filter & Sort",
                desc: "Easily organize tasks by status, date, or title. Advanced search and categorization at your fingertips.",
                color: "from-pink-500 to-red-500",
                icon: "🔍",
              },
              {
                title: "Secure & Private",
                desc: "Your tasks are protected with secure authentication and end-to-end encryption.",
                color: "from-green-500 to-emerald-500",
                icon: "🔒",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-tr ${feature.color} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-white/50 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} TaskFlow. Built with ❤️ for Hackathon Phase II.
          </p>
        </div>
      </footer>
    </div>
  );
}