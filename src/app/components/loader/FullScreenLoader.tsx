import PublicIcon from "@mui/icons-material/Public";
import { Box } from "@mui/material";
import React from "react";
import "./FullScreenLoader.css";

interface FullScreenLoaderProps {
  isLoading: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Box className="fullscreen-loader">
      <PublicIcon />
    </Box>
  );
};

export default FullScreenLoader;
