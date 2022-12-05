import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box/Box";
import { ModulesType } from "../views/modules";
const AppBarStyle = styled(AppBar)(({ theme }) => ({
  position: "static",
  "& .MuiToolbar-root": {
    minHeight: "26px",
    zIndex: theme.zIndex.drawer + 1,
  },
}));
export interface ResponsiveAppBarProps {
  onClick: (e: number) => void;
}
const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ onClick }) => {
  return (
    <AppBarStyle
      sx={{
        bgcolor: "#333",
        height: "40px",
        dispaly: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar>
        <Box
          sx={{ cursor: "pointer", pl: 2, pr: 2 }}
          onClick={() => {
            onClick(ModulesType.Scenes);
          }}
        >
          场景信息
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />
        <Box
          sx={{ cursor: "pointer", pl: 2, pr: 2 }}
          onClick={() => {
            onClick(ModulesType.Layers);
          }}
        >
          图层管理
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />
        <Box sx={{ cursor: "pointer", pl: 2, pr: 2 }}>素材库</Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />
        <Box sx={{ cursor: "pointer", pl: 2, pr: 2 }}>标会</Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />
        <Box sx={{ cursor: "pointer", pl: 2, pr: 2 }}>测量</Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />
      </Toolbar>
    </AppBarStyle>
  );
};
export default ResponsiveAppBar;
