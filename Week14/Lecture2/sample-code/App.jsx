import RainfallChart from "./components/RainfallChart";
import StationsMap from "./components/StationsMap";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Nova Scotia Weather Dashboard</h1>
        <p>Charts and maps in React</p>
      </header>

      <div className="dashboard">
        <section className="panel">
          <RainfallChart />
        </section>
        <section className="panel">
          <StationsMap />
        </section>
      </div>
    </div>
  );
}

export default App;
