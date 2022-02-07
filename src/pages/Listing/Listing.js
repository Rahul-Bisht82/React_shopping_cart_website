import React, { useState, useEffect, Suspense, lazy } from "react";
import "./Listing.scss";
// import CategoryList from "../../components/CategoryList/CategoryList";
// import CategoryDropdown from "../../components/CategoryDropDown/CategoryDropdown";
// import ListingList from "../../components/ListingList/ListingList";
import Fallback from "../../utilities/helper/Fallback";
const CategoryList = lazy(()=>import("../../components/CategoryList/CategoryList"));
const CategoryDropdown = lazy(()=>import("../../components/CategoryDropDown/CategoryDropdown"));
const ListingList = lazy(()=>import("../../components/ListingList/ListingList"));

export default function Listing() {
  let categoryData, categoryLoading, categoryError;
  const storageData = localStorage.getItem("category-list");
  const [width, setWidth] = useState(window.innerWidth);

  if (storageData && JSON.parse(storageData)?.length) {
    categoryData = JSON.parse(storageData);
  } else {
    [categoryData, categoryLoading, categoryError] = useFetch(
      "http://localhost:5000/categories"
    );
    localStorage.setItem("category-list", JSON.stringify(categoryData));
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      {width > 768 ? (
        <div className="list">
          <Suspense fallback={<Fallback />}>
          <CategoryList data={categoryData} />
          </Suspense>
          <Suspense fallback={<Fallback />}>
          <ListingList />
          </Suspense>
        </div>
      ) : (
        <>
          <Suspense fallback={<Fallback />}>
          <CategoryDropdown data={categoryData} />
          </Suspense>
          <Suspense fallback={<Fallback />}>
          <ListingList />
          </Suspense>         
        </>
      )}
    </section>
  );
}
