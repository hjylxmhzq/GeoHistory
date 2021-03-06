import React, { Component } from 'react';
import s from './Search.less';
import { Icon, Input, AutoComplete } from 'antd';

const { Option, OptGroup } = AutoComplete;


export class Complete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.initData('')
        }
    }

    onSelect(i) {
        console.log(this.props)
        if (i.includes(':')) {
            const dy = i.split(': ')[0];
            this.props.onSelect({
                type: 0,
                payload: dy
            })
            let evtOrPpl = i.split(': ')[1];
            let actionType = evtOrPpl.endsWith('年') ? 3 : this.props.event[dy].findIndex(i => i.HName === evtOrPpl) !== -1 ? 2 : 1;
            let payload = null;
            if (actionType === 1) {
                payload = this.props.people[dy].find(i => i.Name === evtOrPpl)['FID'];
                this.props.onSelect({
                    type: actionType,
                    payload
                })
            } else if (actionType === 2) {
                payload = this.props.event[dy].find(i => i.HName === evtOrPpl)['FID'];
                console.log(this.props.event[dy].find(i => i.HName === evtOrPpl))
                this.props.onSelect({
                    type: actionType,
                    payload
                })
            } else if (actionType === 3) {
                payload = this.props.year[dy].find(i => i.Year === evtOrPpl)['idx'];
                this.props.onSelect({
                    type: actionType,
                    payload
                })
            }
        }
    }

    initData(value) {
        if (!this.props.year) {
            return null;
        }
        const year = [];
        let exist = [];
        Object.keys(this.props.year).forEach(y => {
            this.props.year[y].forEach(c => {
                if (y.includes(value)) {
                    if (exist.indexOf(y + ': ' + c.Year) === -1) {
                        year.push({
                            title: y,
                            content: y + ': ' + c.Year
                        })
                        exist.push(y + ': ' + c.Year)
                    }
                }
            })
        });
        const event = [];
        exist = [];
        Object.keys(this.props.event).forEach(y => {
            this.props.event[y].forEach(c => {
                if (c.HName.includes(value)) {
                    if (exist.indexOf(y + ': ' + c.HName) === -1) {
                        event.push({
                            title: y,
                            content: y + ': ' + c.HName
                        })
                    }
                }
            })
        });
        const people = [];
        exist = [];
        Object.keys(this.props.people).forEach(y => {
            this.props.people[y].forEach(c => {
                if (c.Name.includes(value)) {
                    if (exist.indexOf(y + ': ' + c.Name) === -1) {
                        people.push({
                            title: y,
                            content: y + ': ' + c.Name
                        })
                    }
                }
            })
        });
        const dataSource = [
            {
                title: '年代',
                children: year,
            },
            {
                title: '事件',
                children: event
            },
            {
                title: '人物',
                children: people
            },
        ];

        function renderTitle(title) {
            return (
                <span>
                    {title}
                </span>
            );
        }

        const options = dataSource
            .map(group => (
                <OptGroup key={group.title} label={renderTitle(group.title)}>
                    {group.children.map((opt, index) => (
                        <Option key={opt.title + opt.content + index} value={opt.content}>
                            <span className="certain-search-item-count">{opt.content}</span>
                        </Option>
                    ))}
                </OptGroup>
            ))

        this.setState({
            dataSource: options
        })
    }
    handleSearch(value) {
        this.initData(value);
    }
    render() {
        return (
            <div className={s.searchWrapper} style={{ width: 250 }}>
                <AutoComplete
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={true}
                    dropdownStyle={{ width: 300 }}
                    size="large"
                    style={{ width: '100%' }}
                    dataSource={this.state.dataSource}
                    placeholder="搜索"
                    optionLabelProp="value"
                    onSearch={this.handleSearch.bind(this)}
                    onSelect={this.onSelect.bind(this)}
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                </AutoComplete>
            </div>
        );
    }
}