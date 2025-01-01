"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = categoryParam
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/category/${categoryParam}`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryParam]);

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

  if (loading) {
    return (
      <>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          {categoryParam
            ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
            : "All Products"}
        </Typography>
        <Grid container spacing={3}>
          {Array.from(new Array(8)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton variant="rectangular" height={150} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="30%" />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        {categoryParam
          ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
          : "All Products"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <TextField
          label="Search Products"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
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

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box sx={{ position: "relative", pt: "100%" }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    p: 2,
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                  {product.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="secondary.main"
                    sx={{ fontWeight: 700 }}
                  >
                    ${product.price}
                  </Typography>
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{
                      bgcolor: "primary.light",
                      color: "white",
                    }}
                  />
                </Box>
              </CardContent>
              <CardActions
                sx={{ p: 2, pt: 0, justifyContent: "space-between" }}
              >
                <Link
                  href={`/products/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button size="small">View Details</Button>
                </Link>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => addToCart(product)}
                  sx={{
                    bgcolor: "secondary.main",
                    "&:hover": { bgcolor: "secondary.dark" },
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
