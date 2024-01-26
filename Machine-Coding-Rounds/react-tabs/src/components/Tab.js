/* eslint-disable react/prop-types */
/* eslint-disable */
import React, { createContext, useContext } from "react";

// creating a context
const TabContext = createContext();

const Tab = ({ children, value, onChange }) => {
  return (
    <div>
      {/* wrap in children in context */}
      <TabContext.Provider value={{ value, onChange }}>
        {/* pass all children */}
        {children}
      </TabContext.Provider>
    </div>
  );
};
// Tab.displayName = "Tab";

// heading of each tab will be tab heads

Tab.Heads = ({ children }) => {
  return <div className="heads">{children}</div>;
};

// Tab.Heads.displayName = "Tab.Heads";

Tab.Item = ({ label, index, children }) => {
  const { value, onChange } = useContext(TabContext);
  const handleClick = () => {
    onChange(index);
  };
  return (
    <div
      onClick={handleClick}
      className={`item ${index === value ? "active" : null}`}
    >
      {label}
    </div>
  );
};

// Tab.Item.displayName = "Tab.Item";

// content container
Tab.ContentWrapper = ({ children }) => {
  return <div className="contentWraper">{children}</div>;
};

// Tab.ContentWrapper.displayName = "Tab.ContentWrapper";

Tab.Content = ({ children, index }) => {
  const { value } = useContext(TabContext);
  // only show the content of active tab
  return value === index ? <div>{children}</div> : null;
};

// Tab.Content.displayName = "Tab.Content";

export default Tab;
