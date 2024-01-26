import React from "react";
import PropTypes from "prop-types";

function JobPosting({ url, by, time, title }) {
  const formattedTime = new Date(time * 1000).toLocaleString();

  return (
    <div className="post" role="listitem">
      {/* post__title => The BEM Convention: BEM uses block, 
        element, and modifier names to construct CSS class names, 
        separated by double underscores (__) and hyphens (-).  */}
      <h2 className="post__title">
        <a
          // to make our link not clickable if url not present
          className={url ? "" : "inactiveLink"}
          href={url}
          // to open a new page when we click on url
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h2>
      <span className="post__metadata">
        By {by} · {formattedTime}
      </span>
    </div>
  );
}

JobPosting.propTypes = {
  url: PropTypes.string,
  by: PropTypes.string,
  time: PropTypes.number,
  title: PropTypes.string,
};

export default JobPosting;
