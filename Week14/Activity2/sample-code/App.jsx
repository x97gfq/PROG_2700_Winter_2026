import EnrollmentChart from "./components/EnrollmentChart";
import CampusMap from "./components/CampusMap";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>NSCC Campus Dashboard</h1>
        <p>Enrollment and campus locations across Nova Scotia</p>
      </header>
      <div className="dashboard">
        <section className="panel">
          <EnrollmentChart />
        </section>
        <section className="panel">
          <CampusMap />
        </section>
      </div>
    </div>
  );
}

export default App;
