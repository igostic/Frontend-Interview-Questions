const Actions = ({ moveLeft, moveRight }) => {
  return (
    <div className="actions flex">
      <button onClick={moveRight}> &gt; </button>
      <button onClick={moveLeft}> &lt; </button>
    </div>
  );
};

export default Actions;
