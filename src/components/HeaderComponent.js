import React from 'react'
import { Layout} from 'antd';
import '../App.css'
import { Icon } from 'antd'
const { Header } = Layout;

const HeaderComponent =  function(props){
    return(<Header style={{width: '100%',background: '#fff', padding: 0, fontSize:24}}>
          <Icon
            className="trigger"
            type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={props.toggle}
            style={{fontSize: 24, paddingLeft: 12 }}
          />
          MyReads
    </Header>)
}
export default HeaderComponent;
