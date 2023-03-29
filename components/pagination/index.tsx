import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import tw, { styled } from 'twin.macro';

const Pagination = (props) => {
  const {
    currentPage,
    onPageChange,
    pageSize,
    siblingCount = 1,
    totalCount,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Container>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </Container>
  );
};

export default Pagination;

const Container = styled.ul`
  display: flex;
  list-style-type: none;

  ${tw`gap-x-1.5`}

  .pagination-item {
    ${tw`flex items-center justify-center w-8 h-8 font-bold border border-black rounded-md`}
    &.dots:hover {
      background-color: transparent;
      cursor: default;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }

    &.selected {
      color: white;
      background-color: black;
    }

    .arrow {
      &::before {
        position: relative;
        content: '';
        display: inline-block;
        width: 0.5em;
        height: 0.5em;
        border-right: 0.15em solid rgba(0, 0, 0, 0.87);
        border-top: 0.15em solid rgba(0, 0, 0, 0.87);
      }

      &.left {
        transform: rotate(-135deg) translate(-25%);
      }

      &.right {
        transform: rotate(45deg);
      }
    }

    &.disabled {
      pointer-events: none;

      background-color: #eaeaea;
      border-color: #eaeaea;

      .arrow:before {
        border-right: 0.15em solid #666666;
        border-top: 0.15em solid #666666;
      }

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }
  }
`;
