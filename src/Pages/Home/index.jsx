import { useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const { searchByTitle, setSearchByTitle, filteredItems } =
    useContext(ShoppingCartContext);

  const { category } = useParams();

  return (
    <>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none "
        type="text"
        placeholder="Search a product"
        value={searchByTitle}
        onChange={(event) => setSearchByTitle(event.target.value)}
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {filteredItems?.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
      <ProductDetail />
    </>
  );
}

export default Home;
