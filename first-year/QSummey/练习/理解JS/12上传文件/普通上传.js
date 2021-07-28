import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
let num = 1;
let success = 1;
let notUploading = 1;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    console.log("wedscx", num++, info.file.status);
    // info.file.status : uploading done removed
    //  removed 没有触发action接口
    if (info.file.status !== "uploading") {
      console.log("不是uploading", notUploading++);
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log("成功", success++);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

ReactDOM.render(
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>,
  document.getElementById("container")
);