import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

export default function PaginationComponent({
  props,
}: {
  props: PaginationProps;
}) {
  const { totalItems, totalItemsPerPage, currentPage, totalPages } = props;
  const pageRanges = 5;

  let startPage = Math.max(1, currentPage - Math.floor(pageRanges / 2));
  let endPage = Math.min(totalPages, startPage + pageRanges - 1);

  // Điều chỉnh lại startPage nếu endPage đã đạt đến tổng số trang
  if (endPage - startPage < pageRanges - 1) {
    startPage = Math.max(1, endPage - pageRanges + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center">
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage === 1
                ? {
                    query: {
                      page: 1,
                    },
                  }
                : {
                    query: {
                      page: currentPage - 1,
                    },
                  }
            }
          />
        </PaginationItem>

        {startPage > 1 && (
          <PaginationItem>
            <PaginationLink
              className={currentPage === 1 ? "bg-white text-black" : ""}
              href={{
                query: {
                  page: 1,
                },
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {startPage > 2 && <PaginationEllipsis>...</PaginationEllipsis>}

        {pages.map((page) => {
          return (
            <PaginationItem key={page}>
              <PaginationLink
                className={page === currentPage ? "bg-white text-black" : ""}
                href={{
                  query: {
                    page: page,
                  },
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {endPage < totalPages && <PaginationEllipsis>...</PaginationEllipsis>}
        {totalPages > endPage && (
          <PaginationItem>
            <PaginationLink
              className={
                currentPage === totalPages ? "bg-white text-black" : ""
              }
              href={{
                query: {
                  page: totalPages,
                },
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage === totalPages
                ? {
                    query: {
                      page: totalPages,
                    },
                  }
                : {
                    query: {
                      page: currentPage + 1,
                    },
                  }
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
