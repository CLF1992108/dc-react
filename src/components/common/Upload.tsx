import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function Update() {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    debugger;
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      display="flex"
      {...getRootProps()}
      bgcolor="rgba(64,169,255,.06)"
      border-color="rgba(64,169,255,1)"
      sx={{
        height: "100px",
        width: "400px",
        justifyContent: "center",
        alignItems: "center",
      }}
      border-radius="4px"
      border="2px dashed rgba(64,169,255,.3)"
    >
      <input {...getInputProps()} />
      <Box>点击或者拖住文件上传数据</Box>
    </Box>
  );
}
