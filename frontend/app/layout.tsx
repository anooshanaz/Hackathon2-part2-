// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState<
//     { id: number; text: string; completed: boolean }[]
//   >([]);

//   const addTask = () => {
//     if (!task.trim()) return;

//     const newTask = {
//       id: Date.now(),
//       text: task,
//       completed: false,
//     };

//     setTasks([...tasks, newTask]);
//     setTask("");
//   };

//   const toggleTask = (id: number) => {
//     setTasks(
//       tasks.map((t) =>
//         t.id === id ? { ...t, completed: !t.completed } : t
//       )
//     );
//   };

//   const deleteTask = (id: number) => {
//     setTasks(tasks.filter((t) => t.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      
//       <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-6">
        
//         <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
//           📝 Todo App
//         </h1>

//         {/* Input */}
//         <div className="flex gap-3 mb-6">
//           <input
//             type="text"
//             placeholder="Enter a task..."
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <button
//             onClick={addTask}
//             className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
//           >
//             Add
//           </button>
//         </div>

//         {/* Task List */}
//         <ul className="space-y-3">
//           {tasks.length === 0 && (
//             <p className="text-gray-500 text-center">
//               No tasks yet. Add one!
//             </p>
//           )}

//           {tasks.map((t) => (
//             <li
//               key={t.id}
//               className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg"
//             >
//               <span
//                 onClick={() => toggleTask(t.id)}
//                 className={`cursor-pointer flex-1 ${
//                   t.completed
//                     ? "line-through text-gray-400"
//                     : "text-gray-700"
//                 }`}
//               >
//                 {t.text}
//               </span>

//               <button
//                 onClick={() => deleteTask(t.id)}
//                 className="ml-4 text-red-500 hover:text-red-700 font-bold"
//               >
//                 ✕
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import { Inter } from 'next/font/google';

import '../styles/globals.css';
import { AuthProvider } from '../context/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
  description: 'A simple Todo App with Next.js 13+',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
