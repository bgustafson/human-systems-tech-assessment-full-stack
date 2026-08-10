import { useEffect, useState } from "react";

// TODO(candidate): This is a placeholder. Build out the UI for
// creating, viewing, updating, deleting, and searching tasks.
function App() {
  const [status, setStatus] = useState<string>("checking backend...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: { status: string }) =>
        setStatus(`Backend says: ${data.status}`)
      )
      .catch(() => setStatus("Could not reach backend"));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Task Manager</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;
