import { useState, useEffect } from "react";
import { items } from "./Items";

const MultiFilters = () => {
  // states for filters
  const [selectedFilters, setSelectedFilters] = useState([]);

  // state for filtered Items
  const [filteredItems, setFilteredItems] = useState(items);

  // all filters
  const filters = ["Bags", "Watches", "Sports", "Sunglasses"];

  function handleFilteredButtonClick(selectedCategory) {
    // already exist means we are clicking it ton remove
    // from selected state
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  }
  // update the filteredItems
  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  function filterItems() {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = items.filter((item) => item.category === selectedCategory);
        return temp;
      });
      // tempItems will contains array of array as we
      // we are returning temp as array
      setFilteredItems(tempItems.flat());
    } else {
      // incase of no selected filters to display all items
      setFilteredItems([...items]);
    }
  }
  return (
    <div>
      <div className="btn-container">
        {filters.map((category, idx) => (
          <button
            key={category + idx}
            onClick={() => handleFilteredButtonClick(category)}
            className={`button ${selectedFilters?.includes(category) ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="items-container">
        {filteredItems.map((item, idx) => (
          //   <ul key={item.name + idx}>
          //     <li>{item.name}</li>
          //     <li>{item.category}</li>
          //   </ul>
          <div key={`items-${idx}`} className="item">
            <p>{item.name}</p>
            <p className="category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MultiFilters;
