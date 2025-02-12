"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const useSearchParamsState = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "0", 10);
  const keyword = searchParams?.get("keyword") || "";

  const [currentPage, setCurrentPage] = useState(page);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    if (searchKeyword !== keyword) {
      setCurrentPage(0);
    }
  }, [searchKeyword, keyword]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", currentPage.toString());
    params.set("keyword", searchKeyword);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [searchKeyword, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return {
    currentPage,
    setCurrentPage,
    searchKeyword,
    setSearchKeyword,
  };
};
