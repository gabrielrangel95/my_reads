import React from 'react'
import { Layout, Menu, Icon} from 'antd';
import '../App.css'
import { Link } from 'react-router-dom'

const { Sider } = Layout;
const SiderComponent = function(props){
  return(
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      >
        <Menu theme="dark" mode="inline">
          <Menu.Item key="book">
            <Link to="/">
              <Icon type="book" />
              <span>Books</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="search">
            <Link to="/search">
              <Icon type="search" />
              <span>Search</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
export default SiderComponent
