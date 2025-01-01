"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Rating,
  Chip,
  Skeleton,
} from "@mui/material";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={100} />
            <Skeleton variant="rectangular" height={40} width={200} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) return null;

  return (
    <Container sx={{ py: 4, mt: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: 400,
                objectFit: "contain",
              }}
              src={product.image}
              alt={product.title}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating
              value={product.rating?.rate || 0}
              readOnly
              precision={0.5}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating?.count || 0} reviews)
            </Typography>
          </Box>
          <Chip
            label={product.category}
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => addToCart(product)}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
