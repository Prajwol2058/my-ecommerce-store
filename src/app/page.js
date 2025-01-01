"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Paper,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import Carousel from "@/components/Carousel";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(result);
  }, [products, sortBy, searchQuery]);

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Carousel />

      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flexGrow: 1,
              minWidth: "100px",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {isLoading ? (
        <Grid container spacing={4}>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{ borderRadius: 2, boxShadow: 2, overflow: "hidden" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      pt: "100%",
                      bgcolor: "white",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  <CardContent>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </CardContent>
                  <CardActions
                    sx={{ p: 1, pt: 0, justifyContent: "space-between" }}
                  >
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" width="50%" />
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={4}>
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      pt: "100%",
                      bgcolor: "white",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      image={product.image}
                      alt={product.title}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      noWrap
                      sx={{ fontWeight: 450, fontSize: "1rem" }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="secondary.main"
                      sx={{ fontWeight: 500, fontSize: "0.9rem" }}
                    >
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ p: 1, pt: 0, justifyContent: "space-between" }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        size="small"
                        sx={{
                          color: "primary.main",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => addToCart(product)}
                      sx={{
                        bgcolor: "secondary.main",
                        "&:hover": {
                          bgcolor: "secondary.dark",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {visibleProducts < filteredProducts.length && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button variant="contained" onClick={handleShowMore}>
                Show More
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
