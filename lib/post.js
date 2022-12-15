import { API_ENDPOINT, requestHeaders } from "./config";

const getPostList = async (page = 1, volume = 7) => {
  const url =
    API_ENDPOINT +
    "/posts?" +
    new URLSearchParams({
      page: page,
      per_page: volume,
    });

  const response = await fetch(url, { headers: requestHeaders });
  if (response.ok) {
    const paginationInfo = {
      currentPage: parseInt(response.headers.get("x-pagination-page")),
      totalPage: parseInt(response.headers.get("x-pagination-pages")),
    };
    const data = await response.json();

    for (let index = 0; index < data.length; index++) {
      // add dummy image and date

      const item = data[index];
      data[index].date = Math.round(
        1640970000000 + parseInt(item.id) * 9993600
      );
      // using saved random image from unsplash
      data[index].img = postImageList[parseInt(item.id) % postImageList.length];
    }
    return { data, paginationInfo };
  } else {
    throw new Error("Something went wrong");
  }
};

// saved random image from unsplash
const postImageList = [
  "https://images.unsplash.com/photo-1509123779391-4a82c1c0264f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg3MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1479065476818-424362c3a854?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg3Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1516321099745-dd759b1ee63a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg3NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1496957034556-ac36c7c0a5b1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg3OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1470614780380-9f9d268f7681?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg4MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1553366735-5452d07f2c20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg4Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1512028969348-5ed2c16b07a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg4NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1555104747-646a8fa4141e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg4Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1514505725857-9e8a00a0cadf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg4OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1465077135029-626d853c33dc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHwxMzkzODZ8fHx8fHx8MTY3MTAwOTg5MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
];

const getPostPageList = async (itemPerPage) => {
  const { paginationInfo } = await getPostList(1, itemPerPage);
  const paths = [];
  for (let i = 0; i < paginationInfo.totalPage; i++) {
    paths.push(`/posts/${i + 1}`);
  }
  return paths;
};

const getSinglePost = async (idPost) => {
  const url = API_ENDPOINT + "/posts/" + idPost;

  const response = await fetch(url, { headers: requestHeaders });
  if (response.ok) {
    const data = await response.json();
    data.img = postImageList[parseInt(data.id) % postImageList.length];
    data.date = Math.round(1640970000000 + Math.random() * 29980800000);

    // get comments
    let commentList = [];
    const response2 = await fetch(url + "/comments", {
      headers: requestHeaders,
    });
    if (response.ok) {
      commentList = await response2.json();
    }
    data.commentList = commentList;
    return { data };
  } else {
    throw new Error("Something went wrong");
  }
};

export { getPostList, getPostPageList, getSinglePost };
