import { getResultItems } from "../../utils/ResutItem";

export function ResultSection({ result, error, filters }) {
  let resultItems;

  if (!result && !error) return null;

  if (result) {
    resultItems = getResultItems(result, filters);
  }

  return (
    <section className="result-section">
      <div className="section-card result">
        <h4 className="result-title">
          {error
            ? "Oops!"
            : result.log
              ? "View Exercise Logs"
              : result.description
                ? "Exercise Details"
                : "User Details"}
        </h4>

        {error ? (
          <p className="error-msg">{error}</p>
        ) : (
          resultItems.map((item) => (
            <ResultItem key={item.id} label={item.label} value={item.value} href={item.href} />
          ))
        )}
      </div>
    </section>
  );
}

function ResultItem({ label, value, href }) {
  return (
    <div className="result-item">
      <span>{label}</span>

      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ) : (
        <strong>{value}</strong>
      )}
    </div>
  );
}
