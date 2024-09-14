import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isPlaceholderData: boolean;
}

export function PaginationSection({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  isPlaceholderData
}: PaginationSectionProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      pageNumbers.push(
        <PaginationItem key="page-1">
          <PaginationLink
            href="#"
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (currentPage > 3) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      pageNumbers.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            href="#"
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            isActive={!isPlaceholderData && hasPreviousPage}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            isActive={!isPlaceholderData && hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}