import { useEffect, useState } from "react";
import JobPosting from "./components/JobPosting";
import "./styles.css";

const ITEMS_PER_PAGE = 6; // for pagination
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

export default function JobApp() {
  // holds your job postings
  const [items, setItems] = useState([]);
  // holds all itemIds returned from first API
  const [itemIds, setItemIds] = useState(null);
  //will show loading state on load more job btn
  const [fetchingDetails, setFetchingDetails] = useState(false);
  // for pagination
  const [currentPage, setCurrentPage] = useState(0);

  async function fetchItems(currPage) {
    // our fetchItems func contains two API,
    // so we have to optimise to not call
    // mutlitple server API calls
    setCurrentPage(currPage); // Pagination api call logic
    setFetchingDetails(true); // we started fetching our data, so true

    let itemsList = itemIds; // itemIds will be null byDefault
    // so if itemsList is null call api
    if (itemsList === null) {
      // this api will give us all the item ids
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }

    // initially use this and later api pagination logic
    // const itemIdsForPage = itemsList;

    // Pagination logic
    // for 0th page -> load from 0 to 6,
    // for 1st page -> load 6 to 12 and so on
    const itemIdsForPage = itemsList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    );

    // ask interviewer, if any api resp fails, what
    // should we do and accordingly write the logic
    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((response) =>
          response.json(),
        ),
      ),
    );
    // append the response items array
    setItems([...items, ...itemsForPage]);

    // fetch completed
    setFetchingDetails(false);
  }

  // when we have no data(initially)
  // call inside of useEffect hook
  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, []);

  console.log("itemIds", itemIds);

  return (
    <div className="app">
      <h1 className="title">Hacker News Jobs Board</h1>
      {/* if items not present or null show loading */}
      {itemIds === null || items.length < 1 ? (
        // <p className="loading">Loading...</p>
        <p>Loading...</p>
      ) : (
        <div>
          {/* role tells the browser what this div is doing
            it has list of all jobs
          */}
          <div className="items" role="list">
            {items.map((item) => (
              <JobPosting key={item.id} {...item} />
            ))}
          </div>
          {/* for pagination */}
          {/* we should not keep loadin, stop if limit exceeds 
              explains only if interviewer asks or explain later
          */}
          {/* {items.length > 0 &&
            currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE < itemIds.length && ( */}
          <button
            className={`load-more-button`}
            // if it's loading we can disbale the button
            disabled={fetchingDetails}
            onClick={() => fetchItems(currentPage + 1)}
          >
            {fetchingDetails ? "loading..." : "Load more jobs"}
          </button>
          {/* )} */}
        </div>
      )}
    </div>
  );
}
