import TextField from '@mui/material/TextField';
import { Box, List, ListItem, Stack } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SceneProps } from '../../api/gisReq';
import { Scene } from '../../core/Scene';
import { urlSearch } from '../../utils/util';
const DEFAULT_IMG = 'https://dc.dvgis.cn/examples/images/icon/img.png';
export type ViewProps = {
  url: string,
  lng: number,
  lat: number,
  alt: number,
};
const initFormData: SceneProps = {
  name: '',
  remark: '',
  cover: DEFAULT_IMG,
  logo: '',
  view: { url: DEFAULT_IMG, lng: 0, lat: 0, alt: 0 },
};

export const Scenes = () => {
  var l: Scene | null | undefined;
  const [formData, setFormData] = useState<SceneProps>(initFormData);
  const [scene, setScene] = useState<Scene | null | undefined>();

  const onChange = (e: { target: { name: string, value: any } }) => {
    if(scene){
      setFormData({ ...formData, [e.target.name]: e.target.value });
      scene.syncParam({ ...formData, [e.target.name]: e.target.value });
    }
    
  };
  const setCover = async () => {
    if (scene) {
      const cover = await scene.setCover();
      setFormData({ ...formData, cover });
    }
  };
  const setView = async () => {
    if (scene) {
      const view = await scene.setView();
      setFormData({ ...formData, view });
    }
  };
  const mySubscriber =  (scene:Scene | null | undefined)=> {
    return async (msg: string, data: any)=>{
      if (scene) {
        let res = await scene.saveScene();
        if(res){
          PubSub.publish("MSG", {
            severity: "success",
            content: "保存成功"
          })
        } else{
          PubSub.publish("MSG", {
            severity: "error",
            content: "保存失败"
          })
        }
      }
    }
  };
  let getInstance = useCallback(async () => {
    const guid = urlSearch('guid'),
      params = guid ? guid : initFormData;
    let sceneInstance = await Scene.getInstance(params);
    setScene(sceneInstance);
    PubSub.subscribe('SAVE', mySubscriber(sceneInstance));
    if (sceneInstance) {
      let param = sceneInstance.resyncParam(formData);
      setFormData({ ...param });
    }
  }, []);
  useEffect(() => {
    getInstance();
    return () => {
      PubSub.unsubscribe('SAVE');
    };
  }, []);
  return (
    <Stack
      direction="column"
      display="flex"
      sx={{
        maxHeight: 'calc(100vh - 85px)',
        height: 'calc(100vh - 85px)',
        overflowY: "auto",
      }}
      
    >
      <List>
        <ListItem>场景名称</ListItem>
        <ListItem>
          <TextField
            name="name"
            sx={{
              color: '#fff',
              bgcolor: '#fff',
              width: '100%',
              '& .MuiInputBase-input': {
                p: '5px 14px',
              },
            }}
            value={formData?.name}
            onChange={onChange}
          ></TextField>
        </ListItem>
        <ListItem>场景描述</ListItem>
        <ListItem>
          <TextField
            name="remark"
            value={formData?.remark}
            multiline={true}
            maxRows={5}
            minRows={3}
            sx={{ color: '#fff', bgcolor: '#fff', width: '100%' }}
            onChange={onChange}
          ></TextField>
        </ListItem>
        <ListItem>场景封面</ListItem>
        <ListItem>
          <Card sx={{ width: '100%' }}>
            <CardMedia
              component="img"
              image={formData?.cover}
              alt="封面"
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
        <ListItem>场景初始视角</ListItem>
        <ListItem>
          <Card sx={{ width: '100%' }}>
            <CardMedia
              component="img"
              image={(formData?.view as ViewProps)?.url}
              alt="初始视角"
              height={150}
            />
            <CardContent sx={{ p: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                将当前视角设置成初始视角
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 0.5 }}>
              <Button size="small" onClick={setView}>
                设置初始视角
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      </List>
    </Stack>
  );
};
