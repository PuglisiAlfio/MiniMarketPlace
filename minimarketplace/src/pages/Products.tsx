import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../store/features/productSlice";

import Loader from "../components/Loader";
import Card from "../components/UI/Card";

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
}

const Products: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [skip, setSkip] = useState(0);

  const { data, isSuccess, isLoading, isFetching } = useGetAllProductsQuery(
    {
      skip,
      limit,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handlePage = (type: string) => {
    if (type === "NEXT") {
      setPage(page + 1);
    } else if (type === "PREV") {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    setSkip(limit * (page - 1));
  }, [page, limit]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      {isSuccess && data && !isLoading && !isFetching && (
        <>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <div className="grid sm:grid-cols-4 gap-4 my-5">
            {data.products.map((item: Product) => (
              <Card
                key={item.id}
                thumbnail={item.thumbnail}
                title={item.title}
                price={item.price}
                productId={item.id}
              />
            ))}
          </div>
        </>
      )}
      <div className="flex justify-center gap-3 mb-4">
        <button
          className="hover:bg-[#2c0d00] bg-[#4d1601] border border-transparent rounded-md cursor-pointer text-white"
          onClick={() => handlePage("PREV")}
          disabled={page <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className="hover:bg-[#2c0d00] bg-[#4d1601] border border-transparent rounded-md cursor-pointer text-white"
          onClick={() => handlePage("NEXT")}
          disabled={page >= Math.ceil(data.total / limit)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Products;