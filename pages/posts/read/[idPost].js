// import Head from "next/head";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import DateString from "../../../components/DateString";
import Header from "../../../components/Header";
import { getSinglePost } from "../../../lib/post";
import { getSingleUser } from "../../../lib/user";

export default function SinglePost({ postData, userData }) {
  return (
    <div className="w-full h-full">
      <Head>
        <title>
          {`${postData.title} | Next.js Blog` || "Post | Next.js Blog"}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="w-full py-6 px-5 lg:px-36 flex flex-col gap-8 items-center">
        <h1 className="text-3xl md:text-4xl text-center w-full font-bold">
          {postData.title}
        </h1>
        <div className="w-full px-5 md:w-1/2">
          <div className="w-full h-fit rounded-xl overflow-hidden">
            <img src={postData.img} className="w-full" alt="cat" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 justify-center">
          <h2 className="text-md md:text-lg text-justify">{postData.body}</h2>
          <div className="lining-nums"></div>
          <p className="text-sm md:text-md text-gray-600">
            Posted by : {userData.name || "Anonymous"} |{" "}
            <DateString timestamp={postData.date} />
          </p>
        </div>

        <h2 className="text-xl w-full text-left">
          Comments ({postData.commentList.length})
        </h2>
        {postData.commentList.length ? (
          <div className="flex flex-col gap-2 w-full items-center">
            {postData.commentList.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 w-full p-3 bg-white rounded-xl"
              >
                <h4 className="font-bold text-md">{item.name}</h4>
                <p className="text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="gap-2 w-full text-left text-md px-2">
            No comments found
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { idPost } = query;
  let postData = {};
  let userData = {};
  let success = true;

  // get post data
  try {
    await getSinglePost(idPost).then((res) => {
      postData = res.data;
    });
  } catch (err) {
    if (err) success = false;
  }

  // get user data
  if (success)
    try {
      await getSingleUser(postData.user_id).then((res) => {
        userData = res.data;
      });
    } catch (err) {}

  if (success) {
    return {
      props: { postData, userData },
    };
  } else {
    return {
      notFound: true,
    };
  }
}