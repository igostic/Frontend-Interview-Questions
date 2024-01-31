import { useEffect, useState } from "react";
import "./company.css";

export default function CompanyDetails({
  companyData,
  updateCarCount,
  carIndex
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isChildSelected, setIsChildSelected] = useState(
    Array(companyData.children.length).fill(false)
  );

  useEffect(() => {
    updateIsCompanySelected();

    const totalCount = isChildSelected.reduce(
      (totalCount, childState, index) => {
        if (childState) {
          return totalCount + companyData.children[index].count;
        }
        return totalCount;
      },
      0
    );

    updateCarCount(carIndex, totalCount);
  }, [isChildSelected]);

  const updateIsCompanySelected = () => {
    const everyChildSelected = isChildSelected.every(
      (childState) => childState
    );

    setIsSelected(everyChildSelected);
  };

  const toggleAllChildren = (state) => {
    setIsChildSelected(Array(companyData.children.length).fill(state));
  };

  const companySelected = () => {
    toggleAllChildren(!isSelected);
    setIsSelected(!isSelected);
  };

  const handleChildClicked = (index) => {
    setIsChildSelected([
      ...isChildSelected.slice(0, index),
      !isChildSelected[index],
      ...isChildSelected.slice(index + 1)
    ]);
  };

  return (
    <div>
      <div className="companyName">
        <div>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={companySelected}
          />
          {companyData.display} ({companyData.count})
        </div>
        <button onClick={() => setIsOpen(!isOpen)}></button>
      </div>
      {isOpen && (
        <div className="children">
          {companyData.children.map((child, index) => (
            <div key={child.filter.value}>
              <input
                type="checkbox"
                checked={isChildSelected[index]}
                onChange={() => handleChildClicked(index)}
              />
              {child.display} ({child.count})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
