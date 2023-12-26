import react, { useState } from "react";
import axios from "axios";
import s from "./creatememory.module.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Select,
  Upload,
  DatePicker,
  Input,
  notification,
} from "antd";
const { TextArea } = Input;
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

// const normFile = (e) => {
//   console.log(e);
// };
const CreateMemory = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const api = notification;
  const openNotification = () => {
    api.open({
      message: `Воспоминание успешно добавлено`,
      duration: 3,
    });
  };
  const onFinish = async (values) => {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    };
    console.log("Received values of form: ", values);
    const formDataObject = {
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
      title: values.title || null,
      text: values.text || null,
      activity: values["select-multiple"] || null,
      image: values.image ? values.image[0].originFileObj : null,
    };
    console.log(values["select-multiple"]);
    let fr = new FormData();
    fr.append("date", formDataObject.date);
    fr.append("title", formDataObject.title);
    fr.append("text", formDataObject.text);
    fr.append("image", formDataObject.image);
    fr.append("activity", formDataObject.activity);
    let obj = {};
    fr.forEach((value, key) => {
      obj[key] = value;
      if (key === "activity") {
        obj[key] = values["select-multiple"];
      }
    });
    console.log(obj);
    try {
      const response = await axios.post(
        "http://localhost:5001/create",
        obj,
        config
      );
      // Check the status code to determine if the request was successful
      if (response.status === 200) {
        console.log(response.data);
        navigate("/");
        openNotification();
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Error making the request: ${error.message}`);
    }
  };
  return (
    <div className={s.Crtmemory}>
      {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={() => upload()}>Upload</button> */}
      <h1 style={{ fontSize: 50 }} className="font-Smooch">
        Create Memory
      </h1>
      <Form className={s.form_create} name="validate_other" onFinish={onFinish}>
        <Form.Item
          size="large"
          name="select-multiple"
          rules={[
            {
              required: true,
              message: "Please select your favourite colors!",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Select yout action">
            <Option value="Hobby">Hobby</Option>
            <Option value="Sport">Sport</Option>
            <Option value="Home">Home</Option>
            <Option value="Work">Work</Option>
          </Select>
        </Form.Item>
        <Form.Item name="date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="title">
          <Input placeholder="Title"></Input>
        </Form.Item>
        <Form.Item name="text">
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

        <Form.Item
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          noStyle
        >
          <Upload.Dragger
            name="file"
            beforeUpload={(file) => false}
            listType="picture"
            accept=".jpg,.png,.jpeg"
            maxCount={1}
            multiple={false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateMemory;
