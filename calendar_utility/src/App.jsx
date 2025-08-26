import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/calendar">Go to Calendar</Link> |{" "}
        <Link to="/profile">Go to Profile</Link>
      </nav>
    </div>
  );
}

export default App;
