import { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import axios from "axios";
import { Link } from "react-router-dom";

function Table() {
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    await axios
      .get("https://books-api-services.onrender.com/api/v1/books")
      .then((p) => setProducts(p.data.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            <strong>PRODUCTS :)</strong>
          </h2>
          <Link to={"/new"}>
            <button className="text-white bg-blue-600 p-1">NEW</button>
          </Link>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <TableHeader />
                  {products ? (
                    products.map((p) => (
                      <TableBody
                        setProducts={setProducts}
                        products={products}
                        key={p._id}
                        id={p._id}
                        name={p.name}
                        provider={p.provider}
                        category={p.category}
                        price={p.price}
                      />
                    ))
                  ) : (
                    <tfoot>
                      <tr>
                        <th>
                          <strong>CARGANDO...</strong>
                        </th>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Table;
