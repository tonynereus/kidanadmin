import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key,{state:{...location.state}});
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <DashboardOutlined />,
            key: "/dashboard/",
          },
          {
            label: "Inventory",
            key: "/dashboard/inventory/",
            icon: <ShopOutlined />,
          },
          {
            label: "Orders",
            key: "/dashboard/orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Customers",
            key: "/dashboard/customers",
            icon: <UserOutlined />,
          },
          {
            label: "Categories",
            key: "/dashboard/categories",
            icon: <AppstoreOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
