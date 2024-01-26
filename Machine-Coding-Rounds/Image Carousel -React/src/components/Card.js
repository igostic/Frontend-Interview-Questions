const Card = ({ image_url, caption, active, width, height }) => {
  return (
    <div className={`slide ${active ? "active" : ""}`}>
      <img
        src={image_url}
        alt={caption}
        style={{ width, height }}
        // loading={"lazy"}
      />
      <span>{caption}</span>
    </div>
  );
};

export default Card;
