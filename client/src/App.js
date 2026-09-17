import { useState } from "react";

import { ActivitySection } from "./components/ActivitySection/ActivitySection";
import { CreateUserCard } from "./components/CreateUserCard";
import { AddExerciseCard } from "./components/AddExerciseCard";
import { ViewExerciseLogCard } from "./components/ViewExerciseLogCard";
import { ResultSection } from "./components/ResultSection/ResultSection";
import { NavBar } from "./components/NavBar";

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentActivity, setCurrentActivity] = useState("create-user");

  return (
    <div className="App">
      <NavBar />

      <main className="main-container">
        <ActivitySection
          setCurrentActivity={setCurrentActivity}
          setResult={setResult}
          setError={setError}
        />

        {currentActivity === "create-user" && (
          <CreateUserCard result={result} error={error} setResult={setResult} setError={setError} />
        )}

        {currentActivity === "add-exercise" && (
          <AddExerciseCard
            result={result}
            error={error}
            setResult={setResult}
            setError={setError}
          />
        )}

        {currentActivity === "view-logs" && (
          <ViewExerciseLogCard
            result={result}
            error={error}
            setResult={setResult}
            setError={setError}
            setFilters={setFilters}
          />
        )}

        <ResultSection result={result} error={error} filters={filters} />
      </main>
    </div>
  );
}
