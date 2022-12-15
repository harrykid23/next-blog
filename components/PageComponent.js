import NavLink from "./NavLink";

const PageComponent = ({ currentPage, totalPage }) => {
  const path = "/posts";
  const start = currentPage > 2 ? currentPage - 2 : 1;
  const pageCount = 3;
  const end = start + pageCount > totalPage ? totalPage : start + pageCount;
  const pageList = [];
  for (let i = start; i <= end; i++) {
    pageList.push(i);
  }

  return (
    <>
      {currentPage !== 1 && (
        <NavLink
          href={`${path}/1`}
          className="rounded-xl w-10 h-10 bg-krem flex justify-center items-center cursor-pointer hover:bg-biru-tua hover:text-white transition-colors"
          exact
        >
          &lt;&lt;
        </NavLink>
      )}

      {start !== 1 && (
        <div className="rounded-xl w-10 h-10 bg-krem flex justify-center items-center cursor-default">
          ...
        </div>
      )}

      {pageList.map((item, index) => (
        <NavLink
          key={index}
          href={`/posts/${item}`}
          // onClick={() => {
          //   if (item !== currentPage) getData(item);
          // }}
          className={`rounded-xl w-10 h-10 flex justify-center items-center bg-krem hover:bg-biru-tua hover:text-white transition-colors`}
          activeClassName="text-white bg-biru-tua cursor-default"
          exact
        >
          {item}
        </NavLink>
      ))}

      {end !== totalPage && (
        <div className="rounded-xl w-10 h-10 bg-krem flex justify-center items-center cursor-default">
          ...
        </div>
      )}

      {currentPage !== totalPage && (
        <NavLink
          href={`/posts/${totalPage}`}
          className="rounded-xl w-10 h-10 bg-krem flex justify-center items-center cursor-pointer hover:bg-biru-tua hover:text-white transition-colors"
          exact
        >
          &gt;&gt;
        </NavLink>
      )}
    </>
  );
};

export default PageComponent;
