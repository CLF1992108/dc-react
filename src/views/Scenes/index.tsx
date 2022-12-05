import { List, ListItem } from "@mui/material";
import React from "react";

export interface ScenesProps {
  name: string;
  desc: string;
  cover: string;
  angleOfView: Record<string, unknown>;
  logo: string;
}
export const Scenes = () => {
  return (
    <>
      <List>
        <ListItem>Scenes</ListItem>
      </List>
    </>
  );
};
