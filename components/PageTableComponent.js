const PageTableComponent = ({ currentPage, totalPage, getData }) => {
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
        <div
          onClick={() => getData(1)}
          className="rounded-xl w-10 h-10 bg-krem flex justify-center items-center cursor-pointer hover:bg-biru-tua hover:text-white transition-colors"
        >
          &lt;&lt;
        </div>
      )}

      {start !== 1 && (
        <div className="rounded-xl w-10 h-10 bg-krem flex justify-center items-center cursor-default">
          ...
        </div>
      )}

      {pageList.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (item !== currentPage) getData(item);
          }}
          className={`rounded-xl w-10 h-10 flex justify-center items-center bg-krem hover:bg-biru-tua hover:text-white transition-colors ${
            item === currentPage
              ? "text-white bg-biru-tua cursor-default"
              : "cursor-pointer"
          }`}
        >
          {item}
        </div>
      ))}

      {end !== totalPage && (
        <div className="rounded-xl w-10 h-10 bg-krem flex justify-center items-center cursor-default">
          ...
        </div>
      )}

      {currentPage !== totalPage && (
        <div
          onClick={() => getData(totalPage)}
          className="rounded-xl w-10 h-10 bg-krem flex justify-center items-center cursor-pointer hover:bg-biru-tua hover:text-white transition-colors"
        >
          &gt;&gt;
        </div>
      )}
    </>
  );
};

export default PageTableComponent;
