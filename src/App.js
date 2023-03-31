import BirdSearch from "./components/SearchBird";
import BirdList from "./components/BirdList";

function App() {
  return (
    <div className="container">
      <h1>Bird Search</h1>
      <BirdSearch />
      <BirdList />
    </div>
  );
}

export default App;
