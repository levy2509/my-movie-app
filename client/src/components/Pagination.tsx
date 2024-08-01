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
};

export default function PaginationComponent({
  searchParams,
  props,
}: {
  searchParams: {
    slug: string;
    page: number;
    sort_field: string;
    category: string;
    country: string;
    year: string;
  } | null;
  props: PaginationProps;
}) {
  const { totalItems, totalItemsPerPage, currentPage } = props;
  const totalPages = Math.ceil(totalItems / totalItemsPerPage);
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
                      ...searchParams,
                      page: 1,
                    },
                  }
                : {
                    query: {
                      ...searchParams,
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
                  ...searchParams,
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
                    ...searchParams,
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
                  ...searchParams,
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
                      ...searchParams,
                      page: totalPages,
                    },
                  }
                : {
                    query: {
                      ...searchParams,
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
