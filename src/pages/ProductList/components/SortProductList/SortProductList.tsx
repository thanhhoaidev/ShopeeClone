import Button from 'src/components/Button'
import { sortBy, order as orderConstants } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hook/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='bg-[#EDEDED] px-3 py-4 '>
      <div className=' flex items-center justify-between gap-2 custom-max-tablet:justify-center'>
        <div className='flex items-center gap-4 custom-max-tablet:gap-2'>
          <div className='custom-max-tablet:hidden'>Sắp xếp theo</div>
          <Button
            className={classNames(
              'h-8 rounded-sm px-4 text-center text-sm capitalize custom-max-tablet:text-sm custom-max-mobile:px-1 custom-max-mobile:text-xs ',
              {
                'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
                'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
              }
            )}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </Button>
          <Button
            className={classNames(
              'h-8 rounded-sm px-4 text-center text-sm capitalize custom-max-tablet:text-sm custom-max-mobile:px-1 custom-max-mobile:text-xs ',
              {
                'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
                'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
              }
            )}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            {' '}
            Mới nhất
          </Button>
          <Button
            className={classNames(
              'h-8 rounded-sm px-4 text-center text-sm capitalize custom-max-tablet:text-sm custom-max-mobile:px-1 custom-max-mobile:text-xs ',
              {
                'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
                'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
              }
            )}
            onClick={() => handleSort(sortBy.sold)}
          >
            {' '}
            Bán chạy
          </Button>
          <select
            className={classNames(
              'h-8 rounded-sm border-0 px-4 text-left text-sm capitalize outline-none custom-max-tablet:text-sm custom-max-mobile:text-xs',
              {
                'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
                'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
            style={{ border: 0 }}
          >
            <option
              className='overflow-hidden border-0 bg-white text-black outline-none hover:bg-slate-100'
              value=''
              disabled
            >
              Giá
            </option>
            <option
              className='overflow-hidden border-0 bg-white text-black outline-none hover:bg-slate-100'
              value={orderConstants.asc}
            >
              Giá: Thấp đến cao
            </option>
            <option
              className='overflow-hidden border-0 bg-white text-black outline-none hover:bg-slate-100'
              value={orderConstants.desc}
            >
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center custom-max-tablet:hidden'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex custom-max-tablet:hidden'>
            {page === 1 ? (
              <span className=' flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
