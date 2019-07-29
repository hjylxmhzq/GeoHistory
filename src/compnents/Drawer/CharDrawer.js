import React,{Component} from 'react'
import {Drawer} from 'antd'

class CharDrawer extends Component{
  constructor(){
    super();
    this.state = {
      isOpen:false
    }
    this.iconURL = '../../icon/'
  }

  render(){
    return(
      <Drawer
      title={"人物简介"}
      placement="right"
      closable={false}
      visible={this.props.isShow}
      mask={false}
      style={{marginTop:'60px'}}
      >
        <div style={{align:'center',textAlign:'center'}}>
          <img
            src={this.iconURL+(this.props.charSelected?this.props.charSelected:'-1')+'.jpg'} />
        </div>
        <hr/>
        <p>{'姓名：'+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].Name:'')}</p>
        <p>{'字：'+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].zi:'')}</p>
        <p>{'号：'+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].hao:'')}</p>
        <p>{'生年：'+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].STime+' 年':'')}</p>
        <p>{'卒年：'+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].ETime+' 年':'')}</p>
        <p>{'出生地：'+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].Home:'')}</p>
        <p>{'简介：'}</p>
        <p style={{textIndent:'2em'}}>{this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].Intro:''}</p>
      </Drawer>
  )}
}

export default CharDrawer