import "./styles.css";
import { HeartIcon, SpinnerIcon } from "./icons";
import { useState } from "react";
export default function App() {
  const [liked, setLiked] = useState(false);
  // function handleLikeUnlike() {
  //   setLiked(!liked);
  // }
  // --- now fetch data from url and
  // set accordingly -- start
  const [isFetching, setIsFetching] = useState(false);
  // to store error
  const [error, setError] = useState(null);
  async function handleLikeUnlike() {
    // api fetching started
    setIsFetching(true);
    // setting error as null bcz waiting for resp
    setError(null);
    try {
      const resp = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // if liked already unlike is else like
            action: liked ? "unlike" : "like",
          }),
        },
      );
      // error case handling
      if (resp.status >= 200 && resp.status < 300) {
        // toggle the liked state
        setLiked(!liked);
      } else {
        const res = await resp.json();
        setError(res.message);
        return;
      }
    } finally {
      setIsFetching(false);
    }
  }
  // -------- end -----
  return (
    <div className="App">
      {/* disabled attribute to save Like btn
          not to be clickable until resp comes        
      */}
      <button
        disabled={isFetching}
        className={`likeBtn ${liked ? "liked" : ""}`}
        onClick={handleLikeUnlike}
      >
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}{" "}
        {liked ? "Liked" : "Like"}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}
