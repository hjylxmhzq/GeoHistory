import React,{Component} from 'react'
import {Drawer} from 'antd'

export class RightDrawer extends Component{
  constructor(){
    super();
    this.state = {
      isOpen:false
    }
  }

  render(){
    console.log(this.props.data)
    return(
      <Drawer
      title={"检索"}
      placement="right"
      closable={true}
      visible={this.props.isShow}
      mask={false}
      style={{marginTop:'60px'}}
      onClose={this.props.onClose}
      >
          <div style={{fontSize: 18}}>疆域</div><br/>
          {
              this.props.data.selectedBoundary.map(i => {
                  return (
                      <div>
                          名称：{i.attributes.Name} <br/>
                          面积：{i.attributes.Area} <br/>
                          <hr/>
                      </div>
                  )
              })
          }
          <div style={{fontSize: 18}}>事件</div><br/>
          {
              this.props.data.selectedEvents.map(i => {
                  return (
                      <div onMouseOver={() => { this.props.onHoverResult(i.geometry, i.attributes.HName, i.attributes.Intro) }}>
                          名称：{i.attributes.HName} <br/>
                          城市：{i.attributes.HCityName.trim() ? i.attributes.HCityName : '无城市信息'} <br/>
                          <hr/>
                      </div>
                  )
              })
          }
      </Drawer>
  )}
}
