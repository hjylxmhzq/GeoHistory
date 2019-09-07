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

    initData(value) {
        if (!this.props.year) {
            return null;
        }
        const year = [];
        Object.keys(this.props.year).forEach(y => {
            this.props.year[y].forEach(c => {
                if (c.Year.includes(value)) {
                    year.push({
                        title: y,
                        content: y + ': ' + c.Year
                    })
                }
            })
        });
        const event = [];
        Object.keys(this.props.event).forEach(y => {
            this.props.event[y].forEach(c => {
                if (c.HName.includes(value)) {
                    event.push({
                        title: y,
                        content: y + ': ' + c.HName
                    })
                }
            })
        });
        const people = [];
        Object.keys(this.props.people).forEach(y => {
            this.props.people[y].forEach(c => {
                if (c.Name.includes(value)) {
                    people.push({
                        title: y,
                        content: y + ': ' + c.Name
                    })
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
        console.log(dataSource)

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
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                </AutoComplete>
            </div>
        );
    }
}