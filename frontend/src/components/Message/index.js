import { Button, message, Space } from "antd";
const Message = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Updated successfully!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Something went wrong!",
    });
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };
  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </Space>
    </>
  );
};
export default Message;
