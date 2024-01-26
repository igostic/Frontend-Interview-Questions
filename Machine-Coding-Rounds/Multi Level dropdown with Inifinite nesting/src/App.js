import "./styles.css";

const menuData = [
  { label: "Menu 1" },
  {
    label: "Menu 2",
    submenu: [{ label: "Sub Menu 1" }, { label: "Sub Menu 2" }],
  },
  {
    label: "Menu 3",
    submenu: [
      { label: "Sub Menu 1" },
      { label: "Sub Menu 2" },
      { label: "Sub Menu 3" },
      {
        label: "Sub Menu 4",
        submenu: [
          {
            label: "Sub sub menu 1",
            submenu: [{ label: "Sub Sub Menu 4" }],
          },
          { label: "Sub sub menu 2" },
        ],
      },
    ],
  },
  {
    label: "Menu 4",
    submenu: [{ label: "Sub Menu 1" }, { label: "Sub Menu 2" }],
  },
];

export default function App() {
  // render recursively
  const renderSubMenu = (subMenu) => {
    return (
      <ul className="submenu">
        {subMenu.map((subItem, idx) => (
          <li key={subItem.label + idx} onClick={toggleSubMenu}>
            {subItem.label}
            {subItem.submenu && renderSubMenu(subItem.submenu)}
          </li>
        ))}
      </ul>
    );
  };
  const toggleSubMenu = (e) => {
    // to stop event bubbling which cause sub Menu 4
    // to behave weirdly
    e.stopPropagation();
    // select children(submenus) of particular parent element
    let submenu = e.target.querySelector("ul");
    // console.log(submenu);
    // if submenu doesn't exist return
    if (!submenu) return;

    // toggle logic
    //  !submenu.style.display requires to fix double click problem
    // so there is weird behaviour where on initial click
    // submenu.style.display not exist so to solve this needs to use it
    submenu.style.display === "none" || !submenu.style.display
      ? (submenu.style.display = "block")
      : (submenu.style.display = "none");
  };
  return (
    <div className="App">
      <ul>
        {menuData.map((item, idx) => (
          <li key={item.label + idx} onClick={toggleSubMenu}>
            {item.label}
            {item.submenu && renderSubMenu(item.submenu)}
          </li>
        ))}
      </ul>
    </div>
  );
}
