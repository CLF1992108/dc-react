import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Rnd } from "@haichuang/components";
declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  width: "290px",
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: "#fff",
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: "#737373",
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: "#737373",
      color: "#fff",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "#fff",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Box
            component={AddIcon}
            color="inherit"
            sx={{ mr: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              alert(1);
            }}
          />
          <Box
            component={EditIcon}
            color="inherit"
            sx={{ mr: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              alert(2);
            }}
          />
          <Box
            component={DeleteIcon}
            color="inherit"
            sx={{ mr: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              alert(2);
            }}
          />
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

export const Layers = () => {
  const [over, setOver] = useState(false);
  return (
    <>
      <Stack
        direction="column"
        display="flex"
        sx={{
          maxHeight: "calc(100vh - 85px)",
          height: "calc(100vh - 85px)",
        }}
      >
        <Stack
          direction="row"
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            pl: 1,
            pr: 1,
            height: "30px",
            bgcolor: "#222",
            color: "#fff",
            fontSize: "12px",
          }}
        >
          <Stack sx={{ flexGrow: 1 }}>场景图层</Stack>
          <Box
            component={AddIcon}
            color="inherit"
            sx={{ mr: 1, cursor: "pointer" }}
            onClick={() => {
              alert(1);
            }}
          />
          <Box
            component={DeleteIcon}
            color="inherit"
            sx={{ mr: 1, cursor: "pointer" }}
            onClick={() => {
              alert(3);
            }}
          />
        </Stack>
        <Stack
          sx={{
            flexGrow: 1,
            maxWidth: 320,
            height: "1000px",
            overflowY: "auto",
          }}
        >
          <Box sx={{ height: "1000px" }}>
            <TreeView
              aria-label="gmail"
              defaultExpanded={["3"]}
              defaultCollapseIcon={<ArrowDropDownIcon />}
              defaultExpandIcon={<ArrowRightIcon />}
              defaultEndIcon={<div style={{ width: 24 }} />}
            >
              <StyledTreeItem
                nodeId="1"
                labelText="All Mail"
                labelIcon={MailIcon}
              />
              <StyledTreeItem
                nodeId="2"
                labelText="Trash"
                labelIcon={DeleteIcon}
              />
              <StyledTreeItem
                nodeId="3"
                labelText="Categories"
                labelIcon={Label}
              >
                <StyledTreeItem
                  nodeId="5"
                  labelText="Social"
                  labelIcon={SupervisorAccountIcon}
                  labelInfo="90"
                />
                <StyledTreeItem
                  nodeId="6"
                  labelText="Updates"
                  labelIcon={InfoIcon}
                  labelInfo="2,294"
                />
                <StyledTreeItem
                  nodeId="7"
                  labelText="Forums"
                  labelIcon={ForumIcon}
                  labelInfo="3,566"
                />
                <StyledTreeItem
                  nodeId="8"
                  labelText="Promotions"
                  labelIcon={LocalOfferIcon}
                  labelInfo="733"
                />
              </StyledTreeItem>
              <StyledTreeItem
                nodeId="4"
                labelText="History"
                labelIcon={Label}
              />
              <StyledTreeItem
                nodeId="9"
                labelText="History"
                labelIcon={Label}
              />
            </TreeView>
            <TreeView
              aria-label="gmail"
              defaultExpanded={["3"]}
              defaultCollapseIcon={<ArrowDropDownIcon />}
              defaultExpandIcon={<ArrowRightIcon />}
              defaultEndIcon={<div style={{ width: 24 }} />}
            >
              <StyledTreeItem
                nodeId="1"
                labelText="All Mail"
                labelIcon={MailIcon}
              />
              <StyledTreeItem
                nodeId="2"
                labelText="Trash"
                labelIcon={DeleteIcon}
              />
              <StyledTreeItem
                nodeId="3"
                labelText="Categories"
                labelIcon={Label}
              >
                <StyledTreeItem
                  nodeId="5"
                  labelText="Social"
                  labelIcon={SupervisorAccountIcon}
                  labelInfo="90"
                />
                <StyledTreeItem
                  nodeId="6"
                  labelText="Updates"
                  labelIcon={InfoIcon}
                  labelInfo="2,294"
                />
                <StyledTreeItem
                  nodeId="7"
                  labelText="Forums"
                  labelIcon={ForumIcon}
                  labelInfo="3,566"
                />
                <StyledTreeItem
                  nodeId="8"
                  labelText="Promotions"
                  labelIcon={LocalOfferIcon}
                  labelInfo="733"
                />
              </StyledTreeItem>
              <StyledTreeItem
                nodeId="4"
                labelText="History"
                labelIcon={Label}
              />
              <StyledTreeItem
                nodeId="9"
                labelText="History"
                labelIcon={Label}
              />
            </TreeView>
          </Box>
        </Stack>
        <Stack
          direction="row"
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            pl: 1,
            pr: 1,
            height: "30px",
            bgcolor: "#222",
            color: "#fff",
            fontSize: "12px",
          }}
        >
          <Stack sx={{ flexGrow: 1 }}>标绘面</Stack>
          <Box
            component={AddIcon}
            color="inherit"
            sx={{ mr: 1, cursor: "pointer" }}
            onClick={() => {
              alert(1);
            }}
          />
          <Box
            component={DeleteIcon}
            color="inherit"
            sx={{ mr: 1, cursor: "pointer" }}
            onClick={() => {
              alert(3);
            }}
          />
        </Stack>
        <Stack sx={{ overflowY: "auto" }}>
          <Box sx={{ height: "500px" }}>
            <Box sx={{ height: "1100px" }}>12312312</Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
