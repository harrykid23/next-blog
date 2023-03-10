import Head from "next/head";
import React from "react";
import { getPostList, getPostPageList } from "../../lib/post";
import Header from "../../components/Header";
import Link from "next/link";
import DateString from "../../components/DateString";
import PageComponent from "../../components/PageComponent";

export default function Posts({ postList, paginationInfo }) {
  return (
    <div className="w-full h-full">
      <Head>
        <title>Posts | Next.js Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="w-full py-8 px-5 lg:px-36 flex flex-col gap-8 items-center">
        <div className="w-full">
          <h1 className="font-bold text-3xl lg:text-6xl text-center lg:text-left">
            Posts
          </h1>
        </div>

        <div className="flex flex-col gap-4 w-full items-center">
          {/* list blog post */}
          {postList.map((item, index) => {
            return (
              <Link
                key={index}
                href={`/posts/read/${item.id}`}
                className="flex flex-col md:flex-row w-full gap-5 justify-between items-center transition-colors hover:bg-slate-300 p-5 rounded-xl"
              >
                <div className="w-full md:w-1/4 h-fit rounded-xl overflow-hidden">
                  <img src={item.img} className="w-full" alt="cat" />
                </div>
                <div className="w-full md:w-4/5 flex flex-col gap-2 justify-center">
                  <p className="text-sm md:text-lg text-gray-600">
                    <DateString timestamp={item.date} />
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold">
                    {item.title}
                  </h2>
                  <h2
                    className="text-md md:text-lg text-justify overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.body.substr(0, 200)}...
                  </h2>
                </div>
              </Link>
            );
          })}
          <div className="flex w-full justify-center">
            <div className="flex gap-3">
              <PageComponent
                currentPage={paginationInfo.currentPage}
                totalPage={paginationInfo.totalPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ITEM_PER_PAGE = 10;

export async function getServerSideProps({ query }) {
  const { page } = query;
  let postList = {};
  let paginationInfo = {};
  let success = true;
  try {
    await getPostList(page, ITEM_PER_PAGE).then((res) => {
      postList = res.data;
      paginationInfo = res.paginationInfo;
    });
  } catch (err) {
    if (err) success = false;
  }

  if (success) {
    return {
      props: { postList, paginationInfo },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
