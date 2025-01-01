"use client";
import { useState, useEffect } from "react";
import { Paper, Box } from "@mui/material";

export default function Carousel() {
  const [activeStep, setActiveStep] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) =>
        prevStep === products.length - 1 ? 0 : prevStep + 1
      );
    }, 2500);

    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 300,
        mb: { xs: 5, sm: 2 },
        mt: { xs: 15, sm: 8 },
      }}
    >
      {products.map((product, index) => (
        <Paper
          key={product.id}
          sx={{
            display: index === activeStep ? "block" : "none",
            width: "100%",
            height: "100%",
            position: "relative",
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "white",
            }}
          />
        </Paper>
      ))}
    </Box>
  );
}
