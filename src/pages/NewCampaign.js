import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Layout,
  Form,
  Input,
  Button,
  Upload,
  Icon,
  Modal
} from 'antd'

const { TextArea } = Input;
const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;

const ContentContainer = styled(Content) `
  padding: 24px;
`

const FormContainer = styled.div`
  padding: 24px;
  background-color: #fff;
`


class NewCampaign extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  }

  constructor(props) {
    super(props)
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <ContentContainer>
        <FormContainer>
          <Form layout="horizontal">
            <FormItem label="Your campaign Name">
              <Input placeholder="Name..." />
            </FormItem>
            <FormItem label="Describe what you’ll be creating.">
              <TextArea rows={4} />
            </FormItem>
            <FormItem label="Promote images">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </FormItem>
          </Form>
        </FormContainer>
      </ContentContainer>
    )
  }
}


export default NewCampaign
