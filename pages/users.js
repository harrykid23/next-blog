// import Head from "next/head";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import PageTableComponent from "../components/PageTableComponent";
import AddUserComponent from "../components/usersPage/AddUserComponent";
import DeleteUserComponent from "../components/usersPage/DeleteUserComponent";
import EditUserComponent from "../components/usersPage/EditUserComponent";
import { GlobalContext } from "../context/GlobalContext";

export default function UserPage() {
  const {
    userList,
    paginationUser,
    getUserList,
    deleteUser,
    editUser,
    addUser,
  } = useContext(GlobalContext);
  useEffect(() => {
    getUserList(1);
  }, []);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [currentQuery, setCurrentQuery] = useState("");

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    const button = e.target.querySelector("button");
    button.disabled = true;
    await getUserList(1, currentQuery);

    button.disabled = false;
  };

  return (
    <div className="w-full h-full">
      <Head>
        <title>User Page | Next.js Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="w-full py-6 px-5 lg:px-36 flex flex-col gap-8 items-center">
        <h1 className="text-3xl text-center w-full font-bold">User Page</h1>

        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              setModalContent(
                <AddUserComponent
                  setOpen={setOpen}
                  addUser={addUser}
                  currentPage={paginationUser.currentPage}
                />
              );
              setOpen(true);
            }}
            className="bg-biru-tua hover:bg-biru-muda text-sm font-bold flex items-center justify-center px-4 py-2 w-max text-white rounded-xl self-start"
          >
            <i className="fa-solid fa-user-plus text-white"></i> &nbsp; Add User
          </button>

          <div className="w-full sm:w-96 flex">
            <form onSubmit={onSubmitSearch} className="flex flex-1 gap-2">
              <div className="relative w-auto flex-1 flex border-2 border-abu focus-within:border-black focus-within:border-opacity-30 transition-colors rounded-xl items-center">
                <input
                  className="w-full px-3 py-2 rounded-xl border-none outline-none bg-white text-sm"
                  placeholder="Search by name"
                  type="text"
                  onChange={(e) => setCurrentQuery(e.target.value)}
                />
              </div>
              <button className="bg-biru-tua hover:bg-biru-muda transition-colors font-content-0 text-white flex gap-2 items-center justify-center px-4 py-2 rounded-xl">
                <i className="fa-solid fa-magnifying-glass text-md text-white"></i>
              </button>
            </form>
          </div>
        </div>

        {userList.length ? (
          <>
            <table className="tabel-jd flex flex-row flex-nowrap w-full md:inline-table">
              <thead>
                {userList.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={`${
                        index === 0 ? "md:table-row" : "md:hidden"
                      } flex flex-col mt-5 md:mt-0`}
                    >
                      <th className="p-2 text-sm font-bold bg-biru-muda rounded-l-xl overflow-hidden">
                        Id
                      </th>
                      <th className="p-2 text-sm font-bold bg-biru-muda rounded-l-xl md:rounded-l-none overflow-hidden">
                        Name
                      </th>
                      <th className="p-2 text-sm font-bold bg-biru-muda rounded-l-xl md:rounded-l-none overflow-hidden">
                        Email
                      </th>
                      <th className="p-2 text-sm font-bold bg-biru-muda rounded-l-xl md:rounded-l-none overflow-hidden">
                        Gender
                      </th>
                      <th className="p-2 text-sm font-bold bg-biru-muda rounded-l-xl md:rounded-l-none overflow-hidden">
                        Status
                      </th>
                      <th className="p-2 py-3-2 md:py-2 text-sm font-bold bg-biru-muda rounded-l-xl md:rounded-l-none md:rounded-r-xl overflow-hidden row-span-3">
                        Action
                      </th>
                    </tr>
                  );
                })}
              </thead>
              <tbody className="flex-1 md:flex-none">
                {userList.map((item, index) => {
                  return (
                    <tr
                      className="flex flex-col md:table-row mt-5 md:mt-0"
                      key={index}
                    >
                      <td className="p-2 text-sm text-center">{item.id}</td>
                      <td className="p-2 text-sm text-center">{item.name}</td>
                      <td className="p-2 text-sm text-center">{item.email}</td>
                      <td className="p-2 text-sm text-center">{item.gender}</td>
                      <td className="p-2 text-sm text-center">{item.status}</td>
                      <td className="p-2 text-sm justify-center flex gap-2">
                        <button
                          onClick={() => {
                            setModalContent(
                              <DeleteUserComponent
                                userData={item}
                                setOpen={setOpen}
                                deleteUser={deleteUser}
                              />
                            );
                            setOpen(true);
                          }}
                          className="transition-colors bg-red-500 hover:bg-red-400 font-bold flex items-center justify-center p-2 w-fit text-white rounded-xl"
                        >
                          <i className="fa-solid fa-trash-can text-md text-white"></i>
                        </button>
                        <button
                          onClick={() => {
                            setModalContent(
                              <EditUserComponent
                                userData={item}
                                setOpen={setOpen}
                                editUser={editUser}
                              />
                            );
                            setOpen(true);
                          }}
                          className="transition-colors bg-biru-tua hover:bg-biru-muda font-bold flex items-center justify-center p-2 w-fit text-white rounded-xl"
                        >
                          <i className="fa-solid fa-pen-to-square text-md text-white"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex w-full justify-center">
              <div className="flex gap-3">
                <PageTableComponent
                  currentPage={paginationUser.currentPage}
                  totalPage={paginationUser.totalPage}
                  getData={(page) => getUserList(page, currentQuery)}
                />
              </div>
            </div>
          </>
        ) : (
          <p className="text-md">No results found</p>
        )}

        <Modal {...{ open, setOpen }}>
          <div className="relative text-left w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/5 z-50 flex flex-col text-xl font-bold bg-white rounded-2xl">
            {modalContent}
          </div>
        </Modal>
      </main>
    </div>
  );
}
