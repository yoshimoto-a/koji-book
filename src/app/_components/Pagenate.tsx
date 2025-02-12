"use client";
import ReactPaginate from "react-paginate";

interface Props {
  pageCount: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}
export const Paginate: React.FC<Props> = ({
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageChange = (e: { selected: number }) => {
    console.log("onPageChange fired:", e);
    setCurrentPage(e.selected);
  };
  const baseClassName =
    "py-1 px-2 w-8 border rounded text-center block border-dark_brown";
  return (
    <div className="py-3 w-full bg-white/30 flex justify-end">
      <ReactPaginate
        previousLabel={"前"}
        nextLabel={"次"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"flex gap-2"}
        previousLinkClassName={`${baseClassName} mr-4 ml-3`}
        nextLinkClassName={`${baseClassName} ml-4`}
        pageLinkClassName={baseClassName}
        activeLinkClassName={"bg-gray_bg"}
        forcePage={currentPage}
      />
    </div>
  );
};
