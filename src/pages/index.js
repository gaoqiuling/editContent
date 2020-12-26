import React, { Component } from 'react';
import { Form, Button, Space, Upload, Popconfirm, Tag, Input, InputNumber, Divider } from 'antd';
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
    });
    let content = this.getContent();
    this.setState({
      content: content
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
    let content = this.getContent();
    this.setState({
      items: items,
      content: content
    });


  }

  getContent = () => {
    let items = this.state.items;
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
        if (v.type == 'input') {
          item += v.text;
        } if (v.type == 'num') {
          item += '' + i;
        }
      });
      str.push(item);
    }
    return str;
  }

  render() {
    let { items, content } = { ...this.state };
    console.log(content);
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
        {/* <Form.List
          name="names"
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...formItemLayoutWithOutLabel}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    // validateTrigger={['onChange', 'onBlur']}
                    // rules={[
                    //   {
                    //     required: true,
                    //     whitespace: true,
                    //     message: "请输入内容",
                    //   },
                    // ]}
                    noStyle
                  >
                    <Input placeholder="请输入内容" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  添加文案内容
              </Button>
                <Button
                  type="dashed"
                  onClick={() => {
                    add('The head item', 0);
                  }}
                  style={{ width: '60%', marginTop: '20px' }}
                  icon={<PlusOutlined />}
                >
                  添加自增数字
              </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List> */}

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
          <Button type="primary" htmlType="submit">
            复制到剪切板
        </Button>
        </Form.Item>






        {/* <Form.Item   >
          <Input placeholder='请输入固定文案' width='300' />
        </Form.Item>
        <Form.Item >
          <InputNumber min={0} max={10000} defaultValue={10} onChange={this.changeDemo} placeholder='请输入递增最大值'></InputNumber>
        </Form.Item>
        <Form.Item  >
          <Input placeholder='请输入固定文案' width='300' />
        </Form.Item>
        <Form.Item >
          <InputNumber min={0} max={10000} defaultValue={10} onChange={this.changeDemo} placeholder='请输入递增最大值'></InputNumber>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="default" >
            复制到剪切板
        </Button>
        </Form.Item> */}
        <Divider>结果示例</Divider>
        <Form.Item>
          {content.forEach(t => {
            return <p>{t}</p>
          })}
          {content.map((item, index) => (
            <p>{item}</p>
          ))}
          {/* <p> select 1 from cc_comment_0 union </p>
          <p> select 1 from cc_comment_0 union </p>
          ...
          <p> select 1 from cc_comment_0 union </p> */}
        </Form.Item>
      </Form>
      // <div>
      //   <div>
      //       <Tag color="#2db7f5" onClick={this.addText}>固定文案</Tag>
      //       <Tag color="#87d068" onClick={this.addNumText}>自增id</Tag>
      //   </div>
      //   <div>
      //       <div>   <Input placeholder="请输入固定文案" /></div>
      //       <div>  <Input placeholder="请输入固定文案" /></div>
      //       <div>     <InputNumber min={0} max={10000} defaultValue={3} onChange={this.changeDemo} ></InputNumber></div>
      //   </div>

      //   <Button type="primary">Button</Button>
      //   <Upload>
      //     <Button>
      //       <UploadOutlined /> Click to Upload
      //     </Button>
      //   </Upload>
      //   <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
      //     <Button>Confirm</Button>
      //   </Popconfirm>
      // </div>
    )
  }
}

export default Home;