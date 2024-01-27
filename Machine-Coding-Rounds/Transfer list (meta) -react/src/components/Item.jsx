const Item = ({ item, handleToggle }) => {
  // return <div>{item}</div>;
  return (
    <label>
      <input type="checkbox" onChange={() => handleToggle(item)} />
      {item}
    </label>
  );
};

export default Item;
