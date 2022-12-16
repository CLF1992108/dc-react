import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState, useCallback } from "react";
import { TypeProps } from "../../types/Overlay";
import { getTypeList } from "../../api/gisReq";
import { ChildrenTree } from "./ChildrenTree";
import { hcEditor } from "../../store/HcEditor";
import PubSub from "pubsub-js";
declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  nodeId: string;
  bgColor?: string;
  color?: string;
  // labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  currentId: string;
  item: TypeProps;
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
    item,
    nodeId,
    bgColor,
    color,
    // labelIcon: LabelIcon,
    labelInfo,
    labelText,
    currentId,
    ...other
  } = props;
  const handleClick = (item: TypeProps) => {
    return () => {
      hcEditor.draw(item);
    };
  };
  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          {/* <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} /> */}
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          {nodeId === currentId && (
            <>
              <Box
                component={AddIcon}
                color="inherit"
                sx={{ mr: 1 }}
                onClick={handleClick(item)}
              />
              <Box
                component={EditIcon}
                color="inherit"
                sx={{ mr: 1 }}
                onClick={(e: { stopPropagation: () => void }) => {
                  PubSub.publish("CHANGE_TYPE", "Layer");
                }}
              />
              <Box
                component={DeleteIcon}
                color="inherit"
                sx={{ mr: 1 }}
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  alert(2);
                }}
              />
            </>
          )}
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
export const LayerTree = () => {
  const [currentId, setCurrentId] = useState("");
  const [types, setTypes] = useState<TypeProps[]>([]);

  const fetchData = useCallback(async () => {
    const param = {};
    let res = await getTypeList(param),
      resTypes = res.result;
    setTypes([...types, ...resTypes]);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {types.map((element) => (
        <StyledTreeItem
          item={element}
          key={element.id}
          nodeId={element.id}
          labelText={element.name}
          currentId={currentId}
          onMouseEnter={() => {
            setCurrentId(element.id);
          }}
          onMouseLeave={() => {
            setCurrentId("");
          }}
        >
          <ChildrenTree
            type={element.type}
            setParentId={(b) => {
              if (b) {
                setCurrentId("");
              } else {
                setCurrentId(element.id);
              }
            }}
          ></ChildrenTree>
        </StyledTreeItem>
      ))}
    </TreeView>
  );
};
