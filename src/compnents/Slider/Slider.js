import React from 'react';
import s from './Slider.less';
import { Slider } from 'antd';

const LABEL_SEP = 0.1; // slider的label的间隔数，太小会导致年份挤在一起
export default function (props) {
  const marks = {};
  const labels = {}; 
  let index = 0,
  labelsLength = 0;
  Object.keys(props.years).forEach(key => {
    for (let year of props.years[key]) {
      marks[index++] = key + ': ' + year.Year;
      !(index % LABEL_SEP) && (labels[index - 1] = key + ': ' + year.Year) && (labelsLength = index - 1);
    }
  })
  delete labels[labelsLength]; // 删掉最后一个label
  return (
    <div className={s['slider']}>
      <Slider
        marks={labels}
        step={1}
        defaultValue={0}
        min={0}
        max={index - 1}
        tipFormatter={i => marks[i]}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}
