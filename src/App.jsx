import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  console.log(totalProducts);
  const fetchProducts = async () => {
    setIsLoading(true)
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    setProducts(data.products);
    setIsLoading(false)
    setTotalProducts(data.total / 10);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
console.log(isLoading);
  const selectPageHandler = (pageIndex) => {
    console.log(pageIndex);
    setPage(pageIndex);
  };

  return (
   <div>
    {isLoading ? <div>Loading</div>: 
     <>
     <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10 p-20">
       {products.map((product) => {
         return (
           <div>
             <div
               key={product.id}
               className="cursor-pointer flex justify-center items-center flex-col w-56 h-56 "
             >
               <img
                 className="w-full h-full"
                 src={product.thumbnail}
                 alt={product.title}
               />

               <div>{product.title}</div>
             </div>
           </div>
         );
       })}
     </div>
     <div className="my-60 text-center flex  justify-center ">
       <div
         onClick={() => selectPageHandler(page - 1)}
         className={`border border-black p-4 cursor-pointer ${
           page > 1 ? "" : "opacity-0"
         }`}
       >
         ◀
       </div>
       {/* We will check how many products we have */}
       {[...Array(totalProducts)].map((_, i) => {
         return (
           <span
             onClick={() => selectPageHandler(i + 1)}
             key={i}
             className={`border border-black p-4 cursor-pointer ${
               i + 1 === page ? "bg-gray-500" : ""
             }`}
           >
             {i + 1}
           </span>
         );
       })}
       <div
         onClick={() => selectPageHandler(page + 1)}
         className={`border border-black p-4 cursor-pointer ${
           page < totalProducts ? "" : "opacity-0"
         }`}
       >
         ▶
       </div>
     </div>
   </>
    }
   </div>
  );
};

export default App;
