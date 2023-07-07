import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export const alertMessage = (title, message) => {
  return confirmAlert({
    title: title && title,
    message: message && message,
    buttons: [
      {
        label: "Close",
        // onClick: () => alert("Click Yes"),
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
  });
};
