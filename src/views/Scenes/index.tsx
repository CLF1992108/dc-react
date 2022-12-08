import TextField from "@mui/material/TextField";
import { List, ListItem } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import html2canvas from "html2canvas";

export interface ScenesProps {
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
    let ele = document.getElementsByClassName(
      "cesium-widget"
    )[0] as HTMLElement;
    debugger;
    // let canvas = ele.children[0] as any;
    let canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 50;
    canvas.style.backgroundColor = "#f00";
    if (canvas.getContext) {
      const van = canvas.getContext("2d");
      const str = "我是被绘制的文字";
      if (van) {
        van.beginPath();
        van.strokeStyle = "red"; // 设置画笔颜色为红色，即字体颜色
        van.font = "28px serif"; // 设置字体大小
        console.log(van.measureText(str)); // 打印测算返回结果(下面截图)
        van.strokeText(str, 20, 30, 100); // 最大宽度设置100
        van.closePath();
      }
    } else {
      alert("不支持");
    }
    var img = new Image();
    img.src = canvas.toDataURL("image/png");
    console.log(img.src);
    // img.style.cssText +=
    //   "position:absolute;width:100%;left:0;top:0;opacity: 0;z-index: 2000000;";
    setImg(img.src);
    // html2canvas(ele, {
    //   useCORS: true,
    //   logging: false,
    //   y: 0, //  决绝竖向滚动条时，出现空白区域
    //   // width: canvas["width"], //设置canvas尺寸与所截图尺寸相同，防止白边
    //   // height: canvas["height"], //防止白边
    // }).then(function (canvas) {
    //   var img = new Image();
    //   img.src = canvas.toDataURL("image/png");
    //   console.log(img.src);
    //   img.style.cssText +=
    //     "position:absolute;width:100%;left:0;top:0;opacity: 0;z-index: 20;";
    //   setImg(img.src);
    // });
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
          <img src={img} width={196} height={108}></img>
          <Card sx={{ width: "100%" }}>
            <CardMedia component="img" image={img} alt="green iguana" />
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
