import React,{Component} from 'react'
import { Modal } from 'antd'
import './Header.css'
class Header extends Component{
    static defaultProps = {
        title:'华夏印象——中国历史地理数据展示平台',
        about:'关于我们',
        aboutTitle:'华夏印象——中国历史地理数据展示平台',

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
                    <p>{'简介：该平台展示了中国自夏朝（公元前2100年）到新中国成立（1949年）以来的疆界范围、历史人物的人生轨迹和历史事件的分布情况，支持查询、搜索、评论等功能。'}</p>
                    <p>{'制作成员：侯骁谋 胡靖元 胡赛涵 劳大钊'}</p>
                    <p>{'指导老师：马林兵'}</p>
                    <p>{'单位：中山大学 地理科学与规划学院'}</p>
              </Modal>
            </div>
        )
    }
}

export default Header