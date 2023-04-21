import BirdSearch from "./components/SearchBird";
import BirdList from "./components/BirdList";

function App() {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <h1 className="m-4 text-3xl font-bold">Bird Search</h1>
        <BirdSearch />
      </div>
      <BirdList />
    </div>
  );
}

export default App;
