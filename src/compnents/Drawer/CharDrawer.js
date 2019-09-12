import React,{Component} from 'react'
import {Drawer, Button,Empty} from 'antd'

class CharDrawer extends Component{
  constructor(){
    super();
    this.state = {
      visible:false
    }
    this.iconURL = '../../icon/'
  }

  render(){
    let content = (<div/>)
    
    if(this.props.charProfile){
      let charProfile = this.props.charProfile
      console.log(this.iconURL+charProfile.FID+'.jpg')
      content = (
        <div>
           <div style={{align:'center',textAlign:'center'}}>
            <img src={this.iconURL+charProfile.FID+'.jpg'}/>
          </div>
          <hr/>
          <p>{`姓名：${charProfile.Name}`}</p>
          <p>{`字：${charProfile.zi}`}</p>
          <p>{`号：${charProfile.hao}`}</p>
          <p>{`生年：${charProfile.STime}`}</p>
          <p>{`卒年：${charProfile.ETime}`}</p>
          <p>{`出生地：${charProfile.Home}`}</p>
          <p>{`简介：`}</p>
          <p style={{textIndent:'2em'}}>{charProfile.Intro}</p>
        </div>
      )
    }else{
      content=(
        <Empty description={'请选择人物'}/>
      )
    }
    return(
      <div>
        <Button style={{position:'absolute',right:400,bottom:200}} type="primary" onClick={()=>{this.setState({visible:!this.state.visible})}}>
          人物简介
        </Button>
        <Drawer
        title={"人物简介"}
        placement="right"
        closable={false}
        visible={this.state.visible}
        mask={false}
        style={{marginTop:'60px'}}
        >
          {content}
        </Drawer>
      </div>
  )}
}

export default CharDrawer