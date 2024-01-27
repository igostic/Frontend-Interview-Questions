import "./styles.css";

  const limit = 5;
  let rating = 2;

  const starRatingElement = document.getElementById('star-rating');

  const handleClick = (e) => {
    console.log(e.target.data);
    e.stopPropagation();
    rating = e.target.data;
    renderStars();
  };

  const renderStars = () => {
    starRatingElement.innerHTML = '';
    for (let i = 0; i < limit; i++) {
      const star = document.createElement('span');
      star.className = i < rating ? 'star rated' : 'star';
      star.innerHTML = i < rating ? '★' : '☆';
      star.data = i + 1;
      // star.addEventListener('click', () => handleClick(i));
      starRatingElement.appendChild(star);
    }
  };
  starRatingElement.addEventListener('click', handleClick);
  renderStars();
