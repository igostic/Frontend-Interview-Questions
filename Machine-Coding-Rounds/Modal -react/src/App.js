// https://www.youtube.com/watch?v=8kin62BmHHc&list=PL_KW_uw2ITn_J_BNfTpv-yePk8vcyg4dp&index=11&ab_channel=Learnersbucket
// https://learnersbucket.com/examples/interview/functional-modal-component-in-reactjs/

import Modal from "./components/Modal";
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShow(true)}>
        {show ? "hide" : "show"} modal
      </button>
      <Modal show={show} title="Modal" onClose={() => setShow(false)}>
        <button>Click Me</button>
      </Modal>
    </div>
  );
}

// infinitely stacked Modal

// Import React, Modal component, and styles
// import { useState } from "react";
// import Modal from "./components/Modal";
// import "./styles.css";

// // Define the App component
// export default function App() {
//   // Define a state variable 'modals' and a function
//   // 'setModals' to manage the list of open modals
//   const [modals, setModals] = useState([]);

//   // Define a function 'openModal' that adds a new modal to the list
//   const openModal = (title) => {
//     setModals([...modals, { title }]);
//   };

//   // Define a function 'closeModal' that removes the last modal from the list
//   const closeModal = () => {
//     setModals(modals.slice(0, -1));
//   };

//   // Render the App component
//   return (
//     <div className="App">
//       {/* Button to open the first modal */}
//       <button onClick={() => openModal("Modal 1")}>Open Modal</button>
//       {/* Render each modal in the 'modals' array */}
//       {modals.map((modal, index) => (
//         <Modal key={index} title={modal.title} onClose={closeModal}>
//           {/* Render a button to open the next modal only in the topmost modal */}
//           {index === modals.length - 1 && (
//             <button onClick={() => openModal(`Modal ${index + 2}`)}>
//               Open Next Modal
//             </button>
//           )}
//         </Modal>
//       ))}
//     </div>
//   );
// }
