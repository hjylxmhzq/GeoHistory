import React from 'react';
import s from './Slider.less';
import { Slider } from 'antd';

export default function (props) {
  let marks = {};
  let index = 0;
  Object.keys(props.years).forEach(key => {
    for (let year of props.years[key]) {
      marks[index++] = key + ': ' + year.Year;
    }
  })
  return (
    <div className={s['slider']}>
      <Slider
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
