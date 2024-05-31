import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import logo from "../../assets/logo.svg";
import AppContext from "../../concept/appConcept";
import { useLocation } from "react-router-dom";

const Extra1 = () => { return (<></>) }
function AppHeader({ Extra = Extra1 }) {
  const appC = useContext(AppContext);
  const mLocation = useLocation();
  const role =  appC.accInfo.role ||  mLocation.state.data.role;
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      <div className="d-none d-md-block">
        <Typography.Text className="d-md-none"><strong>{role}</strong></Typography.Text>
      </div>
      <div>
        <Typography.Text className="d-none d-md-block"><strong>{role}</strong></Typography.Text>
        <Typography.Text className="d-md-none"><strong>{role}</strong></Typography.Text>
        
      </div>
      <Space>
        <Extra />
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}
export default AppHeader;
