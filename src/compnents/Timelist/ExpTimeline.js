import React,{Component} from 'react';
import { Timeline } from 'antd';

class ExpTimeline extends Component{
  render(){
    return(
      <div>
        <Timeline>
          <div className={'charExp'}>人物经历</div>
          {this.props.exp.map((e,idx)=>{ 
            return <Timeline.Item key={idx} color={'#dc9123'}>
              {e.year+'年，'+e.place+'，'+e.intro}
            </Timeline.Item>
          })}
        </Timeline>
      </div>
    )
  }
}

export default ExpTimeline