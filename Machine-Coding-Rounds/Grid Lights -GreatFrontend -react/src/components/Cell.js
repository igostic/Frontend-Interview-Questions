function Cell({ filled, onClick, isDisabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      // disabled={isDisabled}
      // aria-label={label}
      className={filled ? "cell cell-activated" : "cell"}
    />
  );
}

export default Cell;
