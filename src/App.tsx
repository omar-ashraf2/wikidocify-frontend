// import Comments from "./components/Comments/Comments";
// import ResizableEditor from "./components/Editor/ResizableEditor";
// import Header from "./components/Header/Header";
// import Preview from "./components/Preview/Preview";
// import { DocProvider } from "./context/DocContext";
import { Button } from "@/components/ui/button";
import "./styles/App.css";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Hi Vite</Button>
    </div> // <DocProvider>
    //   <div className="min-h-screen flex flex-col bg-slate-100 text-gray-800 font-sans">
    //     {/* Header */}
    //     <div className="shadow-sm bg-white border-b border-slate-200">
    //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //         <Header />
    //       </div>
    //     </div>

    //     {/* Main Content */}
    //     <div className="flex-1 flex flex-col lg:flex-row overflow-hidden m-2 sm:m-4 gap-4 h-[calc(100vh-8rem)]">
    //       <div className="w-full lg:w-1/2 flex-1">
    //         <div className="bg-white/80 shadow-sm rounded-lg h-full w-full">
    //           <ResizableEditor />
    //         </div>
    //       </div>
    //       <div className="w-full lg:w-1/2 flex-1">
    //         <div className="bg-white/80 shadow-sm rounded-lg h-full w-full overflow-auto">
    //           <Preview />
    //         </div>
    //       </div>
    //     </div>

    //     {/* Comments Section */}
    //     <div className="bg-white/90 shadow-sm rounded-lg mx-2 sm:mx-4 mb-2 sm:mb-4 p-3 sm:p-4">
    //       <Comments />
    //     </div>
    //   </div>
    // </DocProvider>
  );
}

export default App;
