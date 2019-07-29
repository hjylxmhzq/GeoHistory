import React,{Component} from 'react'
import { Modal } from 'antd'
import './Header.css'
class Header extends Component{
    static defaultProps = {
        title:'唐代历史地理数据展示平台',
        about:'关于我们',
        aboutTitle:'ESRI DEMO-唐朝历史地理信息展示平台',

    }
    constructor(){
        super();
        this.state = {
            visible:false
        }
    }

    handleClickbout(){
        this.setState({
            visible: true,
      });
    }
    handleCancel(){
        this.setState({
            visible: false,
      });
    }
    render(){
        return(
            <div className='header'>
                <span className={'title'}>{this.props.title}</span>
                <button className={'about'} onClick={this.handleClickbout.bind(this)}>{this.props.about}</button>
                <Modal
                    title={this.props.aboutTitle}
                    visible={this.state.visible}
                    okText={'确认'}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
              >
                    <p>{'简介：该平台展示了唐朝不同年代的疆界范围、人物轨迹及历史事件，并支持查询搜索等功能。'}</p>
                    <p>{'制作成员：侯骁谋 劳大钊 吴宇东 詹文'}</p>
              </Modal>
            </div>
        )
    }
}

export default Header