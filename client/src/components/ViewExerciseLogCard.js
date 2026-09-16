import { useState } from "react";

import { InputField } from "./InputField";

const logInputFields = [
  {
    name: "userId",
    label: "User ID",
    type: "text",
    placeholder: "Enter user ID",
  },

  {
    name: "from",
    label: "From",
    type: "date",
  },

  {
    name: "to",
    label: "To",
    type: "date",
  },

  {
    name: "limit",
    label: "Limit",
    type: "number",
    placeholder: "10",
    min: 1,
  },
];

const initialState = {
  userId: "",
  from: "",
  to: "",
  limit: "",
};

export function ViewExerciseLogCard({ result, error, setResult, setError }) {
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

    const { userId, from, to, limit } = state;

    try {
      setResult(null);
      setError(null);
      setLoading(true);

      const params = new URLSearchParams();

      if (from) params.append("from", from);
      if (to) params.append("to", to);
      if (limit) params.append("limit", limit);

      const queryString = params.toString();

      const response = await fetch(
        `/api/users/${userId}/logs${queryString ? `?${queryString}` : ""}`,
      );

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
          <h3>Exercise Log</h3>

          <InputField
            {...logInputFields[0]}
            value={state.userId}
            onChange={handleOnChange}
            required
          />

          <div className="log-filters">
            {logInputFields.slice(1).map((field) => (
              <InputField
                key={field.name}
                {...field}
                value={state[field.name]}
                onChange={handleOnChange}
              />
            ))}
          </div>

          <div className="btn-container">
            <button type="submit" className="btn submit-btn" disabled={loading}>
              {loading ? "Loading..." : "View Log"}
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
