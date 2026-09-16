export function InputField({ name, label, type, placeholder, value, onChange, required, min }) {
  return (
    <>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
      />
    </>
  );
}
