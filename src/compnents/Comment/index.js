import React from 'react';
import { Button, Comment, Form, Input } from 'antd';
import config from '../../config';


const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                添加评论
      </Button>
        </Form.Item>
    </div>
);
export class CustomComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: ''
        }
    }

    getComments() {
        const url = config.commentApi + 'getcomments?id=' + this.props.id;
        fetch(url).then((res) => {
            return res.json()
        }).then((json) => {
            this.setState({ comments: json })
        }).catch((e) => {
            this.setState({ comments: [] })
        })
    }

    componentDidMount() {
        this.getComments();
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.getComments();
        }
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({ value })
    }

    onSubmit() {
        const comment = this.state.value;
        const name = this.props.user ? this.props.user : 'anonymous'
        const url = config.commentApi + `addcomments?id=${this.props.id}&name=${name}&content=${comment}`;
        this.setState({ submitting: true });
        fetch(url).then((res) => {
            this.setState({ submitting: false })
            this.getComments();
        }, (e) => {
            this.setState({ submitting: false })
            this.getComments();
        })
    }

    render() {
        return (
            <div id="comments_container" style={{boxShadow: '0px 0px 5px #e6e6e6', padding: 5 }}>
                <div style={{fontSize: 18}}>评论</div>
                {this.state.comments.map(i => {
                    return (
                        <Comment
                            author={<a>{i.name}</a>}
                            content={
                                <p>
                                    {i.content}
                                </p>
                            }
                        />
                    )
                })}
                <Comment
                    content={
                        <Editor
                            onChange={this.onChange.bind(this)}
                            value={this.state.value}
                            submitting={this.state.submitting}
                            onSubmit={this.onSubmit.bind(this)}
                        />
                    }
                />
            </div>
        )
    }
}