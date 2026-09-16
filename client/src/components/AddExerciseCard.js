import { useState } from "react";

import { InputField } from "./InputField";

const ExerciseInputFields = [
  {
    name: "userId",
    label: "User ID",
    type: "text",
    placeholder: "Enter user ID",
  },

  {
    name: "exerciseDesc",
    label: "Description",
    type: "text",
    placeholder: "Enter exercise description",
  },

  {
    name: "durationInMin",
    label: "Duration (minutes)",
    type: "number",
    placeholder: "Enter duration",
    min: 1,
  },

  {
    name: "date",
    label: "Date",
    type: "date",
  },
];

const initialState = {
  userId: "",
  exerciseDesc: "",
  durationInMin: "",
  date: "",
};

export function AddExerciseCard({ result, error, setResult, setError }) {
  const [state, setState] = useState(initialState);

  const [loading, setLoading] = useState(false);

  function handleOnChange(e) {
    setError(null);
    setResult(null);

    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleClear() {
    setResult(null);
    setError(null);
    setState(initialState);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { userId, exerciseDesc, durationInMin, date } = state;

    try {
      setResult(null);
      setError(null);
      setLoading(true);

      const formData = new URLSearchParams();

      formData.append("description", exerciseDesc);
      formData.append("duration", durationInMin);

      if (date) {
        formData.append("date", date);
      }

      const response = await fetch(`/api/users/${userId}/exercises`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="exercise-section">
      <div className="section-card">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Add Exercise</h3>

          {ExerciseInputFields.map((field) => (
            <InputField
              key={field.name}
              {...field}
              value={state[field.name]}
              onChange={handleOnChange}
              required={field.name !== "date"}
            />
          ))}

          <div className="btn-container">
            <button type="submit" className="btn submit-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Exercise"}
            </button>

            {(result || error) && (
              <button type="button" className="btn btn-clear" onClick={handleClear}>
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
