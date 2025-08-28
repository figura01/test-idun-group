"use client";

import { Product } from "@/types";
import { useState, useEffect, useCallback } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const item = localStorage.getItem("favorites");
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (favorites.length > 0) {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        localStorage.removeItem("favorites");
      }
    } catch {
      // Silently fail (private mode, etc.)
    }
  }, [favorites]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === product.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((fav) => fav.id === id),
    [favorites]
  );

  const countFavorites = useCallback(() => favorites.length, [favorites]);

  return { favorites, toggleFavorite, isFavorite, countFavorites };
};
