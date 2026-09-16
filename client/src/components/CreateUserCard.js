import { useState } from "react";

import { InputField } from "./InputField";

const userInputFields = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter username",
  },
];

const initialState = {
  username: "",
};

export function CreateUserCard({ result, error, setResult, setError }) {
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

    try {
      setResult(null);
      setError(null);
      setLoading(true);

      const formData = new URLSearchParams();

      formData.append("username", state.username);

      const response = await fetch("/api/users", {
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
    <section className="user-section">
      <div className="section-card">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Create a User</h3>

          {userInputFields.map((field) => (
            <InputField
              key={field.name}
              {...field}
              value={state[field.name]}
              onChange={handleOnChange}
              required
            />
          ))}

          <div className="btn-container">
            <button type="submit" className="btn submit-btn" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
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
