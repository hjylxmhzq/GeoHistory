import React,{Component} from 'react'
import { Layout, Menu, Icon} from 'antd';
const {  Sider } = Layout;
const { SubMenu } = Menu;

class LeftSider extends Component {
  constructor(){
    super()
    this.state = {
      collapsed: false,
      yearSelectedKeys:[],
      eventSelectedKeys:[],
      charSelectedKeys:[]
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleSelectChange(e){
    if(e.keyPath[1]==='years'){
      if(!this.state.yearSelectedKeys){
        this.setState({yearSelectedKeys:[e.key]})
      }
      else if(this.state.yearSelectedKeys[0]===e.key){
        this.setState({yearSelectedKeys:[]})
      }
      else{
        this.setState({yearSelectedKeys:[e.key]})
      }
    }
    if(e.keyPath[1]==='characters'){
      if(!this.state.charSelectedKeys){
        this.setState({charSelectedKeys:[e.key]})
      }
      else if(this.state.charSelectedKeys[0]===e.key){
        this.setState({charSelectedKeys:[]})
      }
      else{
        this.setState({charSelectedKeys:[e.key]})
      }
    }
    if(e.keyPath[1]==='events'){
      if(!this.state.eventSelectedKeys){
        this.setState({eventSelectedKeys:[e.key]})
      }
      else if(this.state.eventSelectedKeys[0]===e.key){
        this.setState({eventSelectedKeys:[]})
      }
      else{
        this.setState({eventSelectedKeys:[e.key]})
      }
    }
    if(this.props.onSelect){
      this.props.onSelect(e)
    }
  }
  handleEventOpen(e){
    this.setState({eventSelectedKeys:[]})
    if(this.props.onEventOpen){
      this.props.onEventOpen(e)
    }
  }
  handleCharOpen(e){
    this.setState({charSelectedKeys:[]})
    if(this.props.onCharOpen){
      this.props.onCharOpen(e)
    }
  }
  handleYearOpen(e){
    this.setState({yearSelectedKeys:[]})
    if(this.props.onYearOpen){
      this.props.onYearOpen(e)
    }
  }
  render() {
    return (
      <Sider width={'20vh'} style={{padding:'0'}} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu mode="inline" defaultOpenKeys={['years']} selectedKeys={this.state.yearSelectedKeys}
          onOpenChange={this.handleYearOpen.bind(this)}>
          <SubMenu
            onClick={this.handleSelectChange.bind(this)}
            key='years'
            title={
              <span>
                <Icon type="clock-circle" />
                <span>年代图层</span>
              </span>
            }
          >
            {this.props.years?this.props.years.map((year,idx)=>{
              return <Menu.Item key={idx}>{year.Year}</Menu.Item>
            }):console.log('year failed')}
          </SubMenu>
        </Menu>   
        <Menu mode="inline" multiple={false} selectedKeys={this.state.charSelectedKeys}
          onOpenChange={this.handleCharOpen.bind(this)} >
          <SubMenu
            key='characters'
            onClick={this.handleSelectChange.bind(this)}
            
            title={
              <span>
                <Icon type="user" />
                <span>人物轨迹</span>
              </span>
            }
          >
            {this.props.charProfiles?this.props.charProfiles.map((profile,idx)=>{
              return <Menu.Item key={idx}>{profile.Name}</Menu.Item>
          }):console.log('profile failed')}
          </SubMenu>   
        </Menu>
        <Menu mode="inline" multiple={false} selectedKeys={this.state.eventSelectedKeys}
          onOpenChange={this.handleEventOpen.bind(this)}>
          <SubMenu
            key='events'
            onClick={this.handleSelectChange.bind(this)}
            
            title={
              <span>
                <Icon type="read" />
                <span>历史事件</span>
              </span>
            }
          >
            {this.props.events?this.props.events.map((event,idx)=>{
            return <Menu.Item key={idx}>{event.HName}</Menu.Item>
        }):console.log('events failed')}
          </SubMenu>            
        </Menu>
      </Sider>
    );
  }
}

export default LeftSider