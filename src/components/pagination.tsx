'use client';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

type PropsType = {
  page?: number;
  size: number;
  total: number;
  onChangePage?: (page: number) => void;
}

export default function Page({
  page: _page,
  size,
  total,
  onChangePage,
}: PropsType) {

  const [page, setPage] = useState(() => _page ?? 1);

  const [middle] = useState(5);
  const [fixedNumber] = useState(10);

  const pageNumber = useMemo(() => {
    return Math.ceil(total / size) || 0;
  }, [size, total]);

  const _onChangePage = (page: number) => {
    if (page < 1 || page > pageNumber) {
      return;
    }
    setPage(page);
    onChangePage?.(page);
  };

  useEffect(() => {
    if (_page) {
      setPage(_page);
    }
  }, [_page]);

  const LessThanRender = () => {
    return (
      <>
        {
          Array(pageNumber)
            .fill('')
            .map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  className={clsx({
                    'bg-muted': page === idx + 1
                  })}
                  onClick={() => _onChangePage(idx + 1)}
                >{idx + 1}</PaginationLink>
              </PaginationItem>
          ))
        }
      </>
    );
  };

  const MoreThanRender = () => {
    const middlePageList = useMemo(() => {
      const result: number[] = [];
      for (let idx = 0; idx < middle; idx++) {
        if (page < 2 + middle) {
        // 当“当前页”小于“中间显示页数”+2（默认展示前两页）时
          result.push(3 + idx);
        } else if (page >= pageNumber - middle) {
          // 当“当前页”大于“最大页数” - “中间显示页数” - 1时
          result.push(pageNumber - middle - 1 + idx);
        } else {
          // 中间的情况，根据当前页码判断，-2是为了显示当前页在中间
          result.push(page + idx - Math.floor(middle / 2));
        }
      }
      return result;
    }, []);

    return (
      <>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={clsx({
              'bg-muted': page === 1
            })}
            onClick={() => _onChangePage(1)}
          >1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={clsx({
              'bg-muted': page === 2
            })}
            onClick={() => _onChangePage(2)}
          >2</PaginationLink>
        </PaginationItem>

        {
          (page >= middle + 2) ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : ''
        }

        {
          middlePageList.map((item) => (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                className={clsx({
                  'bg-muted': page === item
                })}
                onClick={() => _onChangePage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        
        {
          (page < pageNumber - middle) ||
          ((page < middle + 2) && (page >= pageNumber - middle)) // 这里是防止页码不够时，刚好处于中间状态，导致右边省略号没有显示
            ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : ''
        }

        <PaginationItem>
          <PaginationLink
            href="#"
            className={clsx({
              'bg-muted': page === pageNumber - 1
            })}
            onClick={() => _onChangePage(pageNumber - 1)}
          >{pageNumber - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={clsx({
              'bg-muted': page === pageNumber
            })}
            onClick={() => _onChangePage(pageNumber)}
          >{pageNumber}</PaginationLink>
        </PaginationItem>
      </>
    );
  };

  if (pageNumber === 1) {
    return <></>;
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={clsx({
              'hidden': page === 1
            })}
            onClick={() => _onChangePage(page - 1)}
          />
        </PaginationItem>

        {
          pageNumber < fixedNumber ? <LessThanRender /> : <MoreThanRender />
        }

        <PaginationItem>
          <PaginationNext
            href="#"
            className={clsx({
              'hidden': page === pageNumber
            })}
            onClick={() => _onChangePage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
