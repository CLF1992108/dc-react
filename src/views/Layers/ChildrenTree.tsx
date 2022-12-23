import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState, useCallback } from 'react';
import { getOverlaysByLayerId, getTypeList } from '../../api/gisReq';
import PubSub from 'pubsub-js';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
type StyledTreeItemProps = TreeItemProps & {
  item: any,
  nodeId: string,
  bgColor?: string,
  color?: string,
  // labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string,
  labelText: string,
  currentId: string,
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  width: '290px',
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: '#fff',
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: '#737373',
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: '#737373',
      color: '#fff',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: '#fff',
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
  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          {/* <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} /> */}
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          {nodeId === currentId && (
            <>
              <Box
                component={CenterFocusStrongIcon}
                color="inherit"
                sx={{ mr: 1 }}
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  PubSub.publish('FLY_TO_OVERLAY', item);
                }}
              />
              <Box
                component={EditIcon}
                color="inherit"
                sx={{ mr: 1 }}
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  PubSub.publish('CHANGE_TYPE', {
                    type: 'Overlay',
                    id: currentId,
                  });
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
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}
export const ChildrenTree = (props: {
  type: string,
  setParentId: (v: boolean) => void,
}) => {
  const [currentId, setCurrentId] = useState('');
  const { type, setParentId } = props;
  const [overlays, setOverlays] = useState<any[]>([]);
  const fetchData = useCallback(async () => {
    let overlays1 = await getOverlaysByLayerId({ type });
    setOverlays([...overlays1]);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      {overlays.map((ele) => {
        return (
          <StyledTreeItem
            item={ele}
            key={ele['id']}
            nodeId={String(ele['id'])}
            labelText={ele['name']}
            currentId={String(currentId)}
            onMouseEnter={() => {
              setParentId(true);
              setCurrentId(String(ele['id']));
            }}
            onMouseLeave={() => {
              setParentId(false);
              setCurrentId('');
            }}
          ></StyledTreeItem>
        );
      })}
    </>
  );
};
