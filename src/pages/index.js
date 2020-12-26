import React, { Component } from 'react';
import copy from 'copy-to-clipboard'
import { Form, Button, Input, InputNumber, Divider, Message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      content: []
    }
  }

  add = () => {
    let items = this.state.items;
    let index = items.length;
    let item = {
      id: ++index,
      type: 'input'
    }
    items.push(item);
    this.setState({
      items: items
    });
  }

  addNum = () => {
    let items = this.state.items;
    let index = items.length;
    let item = {
      id: ++index,
      type: 'num'
    }
    items.push(item);
    this.setState({
      items: items
    });
  }

  remove = (id) => {
    let items = this.state.items.filter(t => t.id != id);
    this.setState({
      items: items
    }, () => {
      this.setContent(items);
    });
  }

  refreshContent = (e) => {
    let value = e.target.value;
    if (value === '') {
      return;
    }
    let id = e.target.getAttribute('data-id');
    let items = this.state.items;
    items.forEach(function (v) {
      if (v.id == id) {
        v.text = value;
      }
    });
    this.setState({
      items: items
    }, () => {
      this.setContent(items);
    });
  }

  setContent = (items) => {
    let count = 1;
    items.forEach(function (v) {
      if (v.type == 'num' && v.text && parseInt(v.text) > count) {
        count = parseInt(v.text);
      }
    });
    let str = [];
    for (let i = 0; i < count; i++) {
      let item = '';
      items.forEach(function (v) {
        if (v.text) {
          if (v.type == 'input') {
            item += v.text;
          } if (v.type == 'num') {
            item += '' + i;
          }
        }
      });
      str.push(item);
    }
    this.setState({
      content: str
    });
  }

  copyToClipboard = () => {
    let content = this.state.content;
    let v = '';
    content.forEach(function (c) {
      v += c + '\r\n';
    });
    if (v === '') {
      Message.error('无可复制的内容');
      return;
    }
    copy(v);
    Message.success('复制成功');
  }
  render() {
    let { items, content } = { ...this.state };
    return (
      <Form
        {...formItemLayoutWithOutLabel}
        name="basic">
        {items.map((item, index) => (
          item.type == 'input' ?
            (<Form.Item key={'form' + item.id}>
              <Input placeholder="请输入内容"
                style={{ width: '60%' }}
                onBlur={this.refreshContent}
                data-id={item.id}
                key={'input' + item.id} />
              <MinusCircleOutlined
                className="dynamic-delete-button"
                key={'remove' + item.id}
                onClick={() => this.remove(item.id)}
              />
            </Form.Item>
            )
            :
            (
              <Form.Item key={'form' + item.id}>
                <InputNumber
                  min={0}
                  max={10000}
                  placeholder='请输入递增最大值'
                  style={{ width: '60%' }}
                  onBlur={this.refreshContent}
                  data-id={item.id}
                  key={'input' + item.id}  ></InputNumber>
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  key={'remove' + item.id}
                  onClick={() => this.remove(item.id)}
                />
              </Form.Item>
            )
        ))}
        <Form.Item>
          <Button
            type="dashed"
            onClick={this.add}
            style={{ width: '60%' }}
            icon={<PlusOutlined />}
          >
            添加文案内容
              </Button>
          <Button
            type="dashed"
            onClick={this.addNum}
            style={{ width: '60%', marginTop: '20px' }}
            icon={<PlusOutlined />}
          >
            添加自增数字
              </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.copyToClipboard}>
            复制到剪切板
        </Button>
        </Form.Item>
        <Divider>结果示例</Divider>
        <Form.Item>
          {content.forEach(t => {
            return <p>{t}</p>
          })}
          {content.map((item, index) => (
            <p>{item}</p>
          ))}
        </Form.Item>
      </Form>
    )
  }
}

export default Home;