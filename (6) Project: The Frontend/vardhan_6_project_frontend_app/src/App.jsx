import RandomVerse from "./components/RandomVerse";
import SpecificVerse from "./components/SpecificVerse";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold mb-6">Bible Verse App by Vardhan</h1>
      <RandomVerse />
      <SpecificVerse />
    </div>
  );
}

export default App;
