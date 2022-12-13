import TextField from "@mui/material/TextField";
import { List, ListItem } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { hcEditor } from "../../store/HcEditor";

export interface ScenesProps {
  id?: string;
  name: string;
  desc: string;
  cover: string;
  angleOfView?: Record<string, unknown>;
  logo: string;
}
const initFormData: ScenesProps = {
  name: "",
  desc: "",
  cover: "",
  logo: "",
};
export const Scenes = () => {
  const [formData, setFormData] = useState(initFormData);
  const [img, setImg] = useState(
    "https://dc.dvgis.cn/examples/images/icon/img.png"
  );

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const setCover = () => {
    const canvas = hcEditor.Viewer.canvas;
    const img = new Image();
    hcEditor.Viewer.scene.render();
    img.src = canvas.toDataURL("image/jpeg");
    setImg(img.src);
  };
  return (
    <>
      <List>
        <ListItem>场景名称</ListItem>
        <ListItem>
          <TextField
            name="name"
            sx={{
              color: "#fff",
              bgcolor: "#fff",
              width: "100%",
              "& .MuiInputBase-input": {
                p: "5px 14px",
              },
            }}
            value={formData.name}
            onChange={onChange}
          ></TextField>
        </ListItem>
        <ListItem>场景描述</ListItem>
        <ListItem>
          <TextField
            name="desc"
            value={formData.desc}
            multiline={true}
            maxRows={5}
            minRows={3}
            sx={{ color: "#fff", bgcolor: "#fff", width: "100%" }}
            onChange={onChange}
          ></TextField>
        </ListItem>
        <ListItem>场景封面</ListItem>
        <ListItem>
          <Card sx={{ width: "100%" }}>
            <CardMedia
              component="img"
              image={img}
              alt="green iguana"
              height={150}
            />
            <CardContent sx={{ p: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                将当前视角设置成封面
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 0.5 }}>
              <Button size="small" onClick={setCover}>
                设置封面
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      </List>
    </>
  );
};
