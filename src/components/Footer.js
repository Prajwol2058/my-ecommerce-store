"use client";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: "auto",
        backgroundColor: "#2d2d3e",
        textAlign: "center",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom color=" #39B3A8">
            Quick Links
          </Typography>
          <Link variant="body2" display="block" color="common.white">
            About Us
          </Link>
          <Link variant="body2" display="block" color="common.white">
            Contact
          </Link>
          <Link variant="body2" display="block" color="common.white">
            Privacy Policy
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom color=" #39B3A8">
            Stay Connected
          </Typography>
          <Box>
            <IconButton color="inherit">
              <FacebookIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton color="inherit">
              <TwitterIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom color=" #39B3A8">
            Contact Us
          </Typography>
          <Typography variant="body2" color="common.white">
            My E-commerce Store
            <br />
            Chandragiri-1, Kathmandu, Nepal
            <br />
            support@ecommerce.com
            <br />
            +977-9840506070
          </Typography>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        color="common.white"
        align="center"
        sx={{ mt: 4 }}
      >
        © 2025 E-commerce Store. All rights reserved.
      </Typography>
    </Box>
  );
}
