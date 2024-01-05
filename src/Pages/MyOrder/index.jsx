import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function MyOrder() {
  const { order } = useContext(ShoppingCartContext);

  const params = useParams();
  const indexOrderPath = Number(params.id);

  return (
    <>
      <div className="flex items-center relative w-80 justify-center mb-6">
        <Link className="absolute left-0" to="/my-orders">
          <ChevronLeftIcon className="h-6 w-6 text-black-500 cursor-pointer" />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className="flex flex-col w-80">
        {!isNaN(indexOrderPath)
          ? order?.[indexOrderPath].products.map((product) => (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                images={product.images}
                price={product.price}
              />
            ))
          : order
              ?.slice(-1)[0]
              .products.map((product) => (
                <OrderCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  images={product.images}
                  price={product.price}
                />
              ))}
      </div>
    </>
  );
}

export default MyOrder;
