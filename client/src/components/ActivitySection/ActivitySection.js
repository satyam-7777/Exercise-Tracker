import { useState } from "react";

import "./ActivitySection.css";

export function ActivitySection({ setCurrentActivity, setResult, setError }) {
  const [selectedActivity, setSelectedActivity] = useState("create-user");

  function handleActivityChange(activity) {
    setSelectedActivity(activity);
    setCurrentActivity(activity);

    setResult(null);
    setError(null);
  }

  const activities = [
    {
      id: "create-user",
      label: "Create User",
    },
    {
      id: "add-exercise",
      label: "Add Exercise",
    },
    {
      id: "view-logs",
      label: "View Exercise Logs",
    },
  ];

  return (
    <section className="activity-section">
      <h2>What would you like to do?</h2>

      <ul className="activity-ul">
        {activities.map((activity) => (
          <li key={activity.id}>
            <button
              type="button"
              className={selectedActivity === activity.id ? "activity-btn active" : "activity-btn"}
              onClick={() => handleActivityChange(activity.id)}
            >
              {activity.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
