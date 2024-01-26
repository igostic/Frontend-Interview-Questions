/* eslint react/prop-types: 0 */

export default function TextInput({ title, getvalue, defaultv }) {
  return (
    <>
      <label>{title}</label>
      <input
        type="number"
        value={defaultv}
        onChange={(e) => getvalue(e.target.value)}
      />
    </>
  );
}
