import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaInbox, FaRegEnvelope } from "react-icons/fa"; // Import icons from react-icons library

const Sidebar = () => {
  return (
    <ProSidebar>
      <Menu iconShape="square">
        <MenuItem icon={<FaInbox />}>Inbox</MenuItem>
        <MenuItem icon={<FaRegEnvelope />}>Mail</MenuItem>
        <SubMenu title="Submenu" icon={<FaRegEnvelope />}>
          <MenuItem>Submenu 1</MenuItem>
          <MenuItem>Submenu 2</MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
