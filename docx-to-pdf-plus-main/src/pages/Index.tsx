// import { DocumentConverter } from '@/components/DocumentConverter';

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-12">
//         <DocumentConverter />
//       </div>
//     </div>
//   );
// };

// export default Index;

// import { useRef } from "react";
// import { DocumentConverter } from "@/components/DocumentConverter";
// import ConversionHistory from "@/components/ConversionHistory";
// import Navbar from "@/components/Navbar";

// const Index = () => {
//   const converterRef = useRef<HTMLDivElement>(null);
//   const historyRef = useRef<HTMLDivElement>(null);

//   const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section with buttons */}
//       <Navbar
//         onStartConverting={() => scrollToSection(converterRef)}
//         onViewHistory={() => scrollToSection(historyRef)}
//       />

//       {/* Document Converter */}
//       <div ref={converterRef} className="container mx-auto px-4 py-12">
//         <DocumentConverter />
//       </div>

//       {/* Conversion History */}
//       <div ref={historyRef} className="container mx-auto px-4 py-12">
//         <ConversionHistory history={history} onDownload={handleDownload} />
//       </div>
//     </div>
//   );
// };

// export default Index;



// import { useRef } from "react";
// import Navbar from "@/components/Navbar";
// import { DocumentConverter } from "@/components/DocumentConverter";
// import ConversionHistory from "@/components/ConversionHistory";

// export default function Index() {
//   const converterRef = useRef<HTMLDivElement>(null);
//   const historyRef = useRef<HTMLDivElement>(null);

//   const scrollToConverter = () => {
//     converterRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const scrollToHistory = () => {
//     historyRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div>
//       <Navbar
//         onStartConverting={scrollToConverter}
//         onViewHistory={scrollToHistory}
//       />

//       <div ref={converterRef}>
//         <DocumentConverter />
//       </div>

//       <div ref={historyRef}>
//         <ConversionHistory history={[]} onDownload={() => {}} />
//       </div>
//     </div>
//   );
// }


import { useRef } from "react";
import Navbar from "@/components/Navbar";
import { DocumentConverter } from "@/components/DocumentConverter";
// import ConversionHistory from "@/components/ConversionHistory";

export default function Index() {
  const converterRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const scrollToConverter = () => {
    converterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar
        onStartConverting={scrollToConverter}
        onViewHistory={scrollToHistory}
      />

      <div ref={converterRef}>
        <DocumentConverter historyRef={historyRef} />
      </div>

    </div>
  );
}
