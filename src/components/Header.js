"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  ButtonGroup,
  Divider,
  ListItemText,
  Collapse,
  Paper,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } =
    useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productsMenu, setProductsMenu] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const handleProductsClick = (event) => {
    setProductsMenu(event.currentTarget);
  };

  const handleProductsClose = () => {
    setProductsMenu(null);
  };

  const handleCategoryClick = (category) => {
    router.push(`/products?category=${category}`);
    handleProductsClose();
  };

  return (
    <>
      <AppBar position="absolute" sx={{ bgcolor: "#2d2d3e" }}>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              py: 1,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: { xs: 300, md: 700 },
                mr: { xs: 0, md: 10 },
                mb: { xs: 2, md: 0 },
              }}
            >
              <Link href="/" style={{ color: "white", textDecoration: "none" }}>
                My E-commerce Store
              </Link>
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Link href="/" style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  sx={{
                    color: pathname === "/" ? "secondary.main" : "white",
                    fontWeight: 600,
                  }}
                >
                  Home
                </Button>
              </Link>

              <Button
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleProductsClick}
                sx={{
                  color: pathname.includes("/products")
                    ? "secondary.main"
                    : "white",
                  fontWeight: 600,
                }}
              >
                Categories
              </Button>
              <Menu
                anchorEl={productsMenu}
                open={Boolean(productsMenu)}
                onClose={handleProductsClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    "& .MuiList-root": {
                      minWidth: 200,
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/products");
                    handleProductsClose();
                  }}
                >
                  All
                </MenuItem>
                <Divider />
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <Badge
                badgeContent={getTotalItems()}
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: "secondary.main",
                    color: "white",
                    fontWeight: 600,
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: {
              xs: "90%",
              md: 370,
            },
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Shopping Cart
          </Typography>
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {cart.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  flexDirection: "column",
                  alignItems: "stretch",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  mb: 2,
                  p: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: "contain",
                      mr: 2,
                      bgcolor: "white",
                      borderRadius: 1,
                      p: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="secondary.main"
                      sx={{ fontWeight: 700 }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ButtonGroup
                    size="small"
                    sx={{
                      "& .MuiButton-root": {
                        borderColor: "primary.light",
                      },
                    }}
                  >
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button disabled sx={{ px: 2 }}>
                      {item.quantity}
                    </Button>
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  >
                    Remove
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              // mt: "auto",
              p: 1,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 2,
              boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Total: ${getTotalPrice().toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "auto",
              p: 3,
            }}
          >
            <Button
              onClick={() => setDrawerOpen(false)}
              variant="contained"
              color="primary"
            >
              Close
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => console.log("Checkout button clicked")}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
