import { useState } from "react";

export default function AddUserComponent({ setOpen, addUser, currentPage }) {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    status: "active",
    gender: "male",
  });

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

  const onSubmitAdd = async (e) => {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    hideAlert();
    const res = await addUser(userForm, currentPage);
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
        onSubmit={onSubmitAdd}
        className="flex flex-col gap-6 w-full px-10 pb-10"
      >
        <h6 className="font-bold text-center">Add User</h6>
        <div className="flex flex-col gap-3 w-full mt-5">
          <div className="flex w-full items-center justify-between gap-5">
            <div className="flex items-center w-1/3 gap-2 md:gap-3">
              <p className="text-sm">Name</p>
            </div>

            <div className="flex w-2/3 border-2 border-black rounded-xl items-center select-container">
              <input
                className="w-full px-3 py-2 rounded-xl border-none outline-none bg-white text-sm"
                type="text"
                value={userForm.name}
                onChange={(e) => {
                  setUserForm({ ...userForm, name: e.target.value });
                }}
                required
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-5">
            <div className="flex items-center w-1/3 gap-2 md:gap-3">
              <p className="text-sm">Email</p>
            </div>

            <div className="flex w-2/3 border-2 border-black rounded-xl items-center select-container">
              <input
                className="w-full px-3 py-2 rounded-xl border-none outline-none bg-white text-sm"
                type="text"
                value={userForm.email}
                onChange={(e) => {
                  setUserForm({ ...userForm, email: e.target.value });
                }}
                required
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-5">
            <div className="flex items-center w-1/3 gap-2 md:gap-3">
              <p className="text-sm">Gender</p>
            </div>

            <div className="flex w-2/3 border-none rounded-xl items-center select-container gap-5 py-2">
              <div className="flex gap-1 items-center justify-center">
                <input
                  type="radio"
                  name="genderRadio"
                  checked={userForm.gender === "male"}
                  onChange={() => {
                    setUserForm({ ...userForm, gender: "male" });
                  }}
                />
                <p className="text-sm">Male</p>
              </div>
              <div className="flex gap-1 items-center justify-center">
                <input
                  type="radio"
                  name="genderRadio"
                  checked={userForm.gender === "female"}
                  onChange={() => {
                    setUserForm({ ...userForm, gender: "female" });
                  }}
                />
                <p className="text-sm">Female</p>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-5">
            <div className="flex items-center w-1/3 gap-2 md:gap-3">
              <p className="text-sm">Status</p>
            </div>

            <div className="flex w-2/3 border-none rounded-xl items-center select-container gap-5 py-2">
              <div className="flex gap-1 items-center justify-center">
                <input
                  type="radio"
                  name="statusRadio"
                  checked={userForm.status === "active"}
                  onChange={() => {
                    setUserForm({ ...userForm, status: "active" });
                  }}
                />
                <p className="text-sm">Active</p>
              </div>
              <div className="flex gap-1 items-center justify-center">
                <input
                  type="radio"
                  name="statusRadio"
                  checked={userForm.status === "inactive"}
                  onChange={() => {
                    setUserForm({ ...userForm, status: "inactive" });
                  }}
                />
                <p className="text-sm">Inactive</p>
              </div>
            </div>
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
        <button
          type="submit"
          className="transition-colors bg-biru-tua hover:bg-biru-muda text-sm font-bold flex items-center justify-center px-4 py-2 w-full text-white rounded-xl m-auto"
        >
          Submit
        </button>
      </form>
    </>
  );
}
