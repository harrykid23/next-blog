import { useState } from "react";

export default function DeleteUserComponent({ userData, setOpen, deleteUser }) {
  const [alertText, setAlertText] = useState({
    show: false,
    text: "",
    success: true,
  });

  const setErrorAlert = (message) => {
    setAlertText({
      show: true,
      text: message,
      success: false,
    });
  };
  const hideAlert = () => {
    setAlertText({
      show: false,
      text: alertText.message,
      success: alertText.success,
    });
  };

  const onSubmitDelete = async (e) => {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    hideAlert();
    const res = await deleteUser(userData);
    button.disabled = false;
    if (res.success) {
      setOpen(false);
    } else {
      setErrorAlert("Something went wrong.");
    }
  };
  return (
    <>
      <div className="flex w-full justify-end p-7 pb-0">
        <i
          onClick={() => setOpen(false)}
          className="fas fa-times text-3xl cursor-pointer text-biru-tua hover:text-biru-muda transition duration-300"
        ></i>
      </div>
      <form
        onSubmit={onSubmitDelete}
        className="flex flex-col gap-6 w-full px-10 pb-10"
      >
        <h6 className="font-bold text-center">Confirm</h6>
        <div className="flex flex-col gap-3 w-full mt-5">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm w-full text-center">
              Are you sure you want to remove this user?
            </p>
          </div>

          <div
            className={`${
              alertText.show ? "flex" : "hidden"
            } p-4 mb-4 text-sm ${
              alertText.success
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            } rounded-lg`}
            role="alert"
          >
            <svg
              className="inline flex-shrink-0 mr-3 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div>{alertText.text}</div>
          </div>
        </div>
        <div className="flex justify-center gap-4 w-100">
          <button
            type="submit"
            className="transition-colors bg-biru-tua hover:bg-biru-muda text-sm font-bold flex items-center justify-center px-4 py-2 w-max md:w-1/3 text-white rounded-xl text-center"
          >
            Remove
          </button>
          <button
            onClick={() => setOpen(false)}
            className="transition-colors border-2 border-biru-tua hover:bg-gray-200 text-sm flex items-center justify-center px-4 py-2 w-max md:w-1/3 text-black rounded-xl text-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
