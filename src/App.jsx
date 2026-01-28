import { Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Home</h1>

      <Button>shadcn Button works</Button>
    </div>
  );
}

function About() {
  return <h1>About Page</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
