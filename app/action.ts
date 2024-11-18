/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  // Ensure all items have a unique `id`
  return data.map((anime: any, index: number) => ({
    ...anime,
    id: anime.id || `${page}-${index}`, // Generate a fallback ID if missing
  }));
};
