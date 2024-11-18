"use client";

import { fetchAnime } from "@/app/action";
import AnimeCard from "./AnimeCard";
import { useState, useEffect } from "react";
import Image from "next/image";

let page = 2;
export type AnimeCard = JSX.Element;

function LoadMore() {
  const [data, setData] = useState<AnimeCard[]>([]);
  const [loading, setLoading] = useState(false);

  //! Handle scroll event 50% from the bottom
  const handleScroll = () => {
    const scrolledPercentage =
      (window.scrollY + window.innerHeight) / document.body.scrollHeight;

    // If scrolled beyond 50%, fetch new data
    if (scrolledPercentage > 0.5 && !loading) {
      fetchMoreData();
    }
  };

  //! Fetch more data
  const fetchMoreData = async () => {
    setLoading(true); // Show spinner
    try {
      const newData = await fetchAnime(page);
      setData((prev) => [...prev, ...newData]);
      page++;
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  //! Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <Image
            src="/spinner.svg"
            alt="Loading..."
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default LoadMore;
