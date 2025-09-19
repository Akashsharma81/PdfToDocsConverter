// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'

// const queryClient = new QueryClient();

// const router = createBrowserRouter(
  
//   [
//     { path: "/", element: <Index /> },
//     { path: "*", element: <NotFound /> },
//   ],
//   {
//     future: {
//       v7_startTransition: true,
//       v7_relativeSplatPath: true,
//     },
//   }
// );

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <Navbar/>
//       <Footer/>
//       <RouterProvider router={router} />
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import { useRef } from "react";

// const queryClient = new QueryClient();

// const router = createBrowserRouter(
//   [
//     { path: "/", element: <Index /> },
//     { path: "*", element: <NotFound /> },
//   ],
//   {
//     future: {
//       v7_startTransition: true,
//       v7_relativeSplatPath: true,
//     },
//   }
// );

// const App = () => {
//   // ✅ Hooks top-level par likhne chahiye
//   const converterRef = useRef<HTMLDivElement>(null);
//   const historyRef = useRef<HTMLDivElement>(null);

//   const scrollToConverter = () => {
//     converterRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const scrollToHistory = () => {
//     historyRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         {/* Layout wrapper */}
//         <div className="flex flex-col min-h-screen">
//           <Navbar
//             onStartConverting={scrollToConverter}
//             onViewHistory={scrollToHistory}
//           />
//           {/* Content grows to fill remaining space */}
//           <main className="flex-1">
//             <RouterProvider router={router} />
//             {/* Yeh jagah pe aap apne Converter/History sections ko mount karoge
//                 aur ref attach karoge */}
//             <div ref={converterRef} />
//             <div ref={historyRef} />
//           </main>
//           <Footer />
//         </div>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Footer from './components/Footer';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "*", element: <NotFound /> },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="flex flex-col min-h-screen">
        <RouterProvider router={router} />
        <Footer />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
