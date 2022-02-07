import React, { useEffect, Suspense, lazy } from "react";
import { fetchProductData } from "../../redux/product/productAction";
import { useSelector, useDispatch } from "react-redux";
const ListingCard = lazy(()=>import("../ListingCard/ListingCard"));
import ProductSkeleton from "../ProductSkeleton/ProductSkeleton";
import Fallback from "../../utilities/helper/Fallback";
const url = "http://localhost:5000/products";

function ListingList() {
  const dispatch = useDispatch();
  const { data, loading = true, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductData(url));
  }, []);

  return (
    <>
      {loading ? (
        <ProductSkeleton />
      ) : error ? (
        <h1>Error while fetching data</h1>
      ) : (
        <Suspense fallback = {<Fallback />}>
        <ListingCard data={data} />
        </Suspense>
      )}
    </>
  );
}

export default React.memo(ListingList);
