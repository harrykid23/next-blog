import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  open,
  setOpen,
  positionStart = false,
  children,
}) {
  const initialFocus = useRef(<></>);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
        initialFocus={initialFocus}
      >
        <div
          ref={initialFocus}
          className={`flex ${
            positionStart
              ? "items-start justify-start"
              : "items-center justify-center"
          } min-h-screen text-center sm:p-0`}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={`fixed inset-0 ${
                positionStart ? "" : "bg-black bg-opacity-75"
              } transition-opacity`}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 -translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
