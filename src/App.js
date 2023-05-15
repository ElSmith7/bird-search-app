import BirdSearch from "./components/SearchBird";
import BirdList from "./components/BirdList";

function App() {
  return (
    <div className="container mx-auto bg-white ">
      <div className="flex flex-col items-center">
        <h1 className="m-5 text-5xl font-bold text-slate-900">Bird Search</h1>
        <BirdSearch />
      </div>
      <BirdList />
    </div>
  );
}

export default App;
