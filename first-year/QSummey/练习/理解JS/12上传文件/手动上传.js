import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import reqwest from "reqwest";

class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });
    console.log("11111111", formData);
    console.log("1111111122", fileList);
    for (let pair of formData.entries()) {
      console.log("111", pair[0] + ": " + pair[1]);
    }
    formData.set("ip", 2222);

    this.setState({
      uploading: true
    });

    // You can use any AJAX library you like
    reqwest({
      url: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      method: "post",
      contentType: "multipart/form-data",
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false
        });
        message.success("upload successfully.");
      },
      error: () => {
        this.setState({
          uploading: false
        });
        message.error("upload failed.");
      }
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      multiple: true,
      // accept: ".csv",
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: (file) => {
        console.log("hhhh", file);
        this.setState((state) => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));



