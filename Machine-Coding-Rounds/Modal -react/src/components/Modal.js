// const Modal = ({ show, onClose, title, children }) => {
//   console.log({ show, onClose, title, children });
//   return (
//     show && (
//       <>
//         <div className="modal-backdrop" onClick={onClose}></div>
//         <div className={`modal-wrapper ${show ? "active" : ""}`}>
//           <div className="modal-header">
//             <div className="modal-title">{title}</div>
//             <span className="modal-close" onClick={onClose}>
//               X
//             </span>
//           </div>
//           <div className="modal-body">{children}</div>
//         </div>
//       </>
//     )
//   );
// };

// infinite modal stack

// Import the useState hook from React
import { useState } from "react";

// Define the Modal component
const Modal = ({ title, onClose, children }) => {
  console.log(children);
  // Define a state variable 'show' and a function 'setShow' to control whether the modal is shown or not
  const [show, setShow] = useState(true);

  // Define a function 'closeModal' to close the modal
  const closeModal = () => {
    // Set 'show' to false, hiding the modal
    setShow(false);
    onClose();
    // Schedule the 'onClose' function to be executed after 300 milliseconds
    // setTimeout(onClose, 300);
  };

  // Render the modal
  return (
    // Conditionally render the modal based on the 'show' state
    show && (
      <>
        {/* This div serves as a backdrop. If the user clicks outside the modal, the 'closeModal' function is triggered */}
        <div className="modal-backdrop" onClick={closeModal}></div>
        {/* This div contains the modal */}
        <div className={`modal-wrapper ${show ? "active" : ""}`}>
          <div className="modal-header">
            {/* Display the modal title */}
            <div className="modal-title">{title}</div>
            {/* Display a close button. When clicked, it triggers the 'closeModal' function */}
            <span className="modal-close" onClick={closeModal}>
              X
            </span>
          </div>
          {/* Render the content of the modal */}
          <div className="modal-body">{children}</div>
        </div>
      </>
    )
  );
};

// Export the Modal component
export default Modal;
