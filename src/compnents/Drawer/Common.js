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
                          名称：{i.Name} <br/>
                          面积：{i.Area} <br/>
                          <hr/>
                      </div>
                  )
              })
          }
      </Drawer>
  )}
}
