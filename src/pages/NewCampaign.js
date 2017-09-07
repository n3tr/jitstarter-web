import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Layout,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Icon,
  Modal,
  Select,
  Radio,
  Checkbox,
  DatePicker
} from 'antd'

const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

const ContentContainer = styled(Content) `
  padding: 24px;
`

const FormContainer = styled.div`
  padding: 24px;
  background-color: #fff;
`

const Headline = styled.h1`
  color: dimgray;
`

class NewCampaign extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    selectedType: 'money',
    maxReachValue: null,
    minReachValue: null,
    unlimitMaxReachValue: false,
    unlimitMinReactValue: false
  }

  constructor(props) {
    super(props)
  }

  // -- Upload handlr
  handleUploadCancel = () => this.setState({ previewVisible: false })
  handleUploadPreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleUploadChange = ({ fileList }) => this.setState({ fileList })

  // -- Campaign type handlr
  handleCampaignType = (event) => {
    this.setState({ selectedType: event.target.value })
  }

  // -- Reach amount handlr
  handleMaxReachValue = (value) => {
    this.setState({ maxReachValue: value })
  }

  // -- Checkbox handlr
  handdleUnlimitMaxReachValue = (event) => {
    this.setState({ unlimitMaxReachValue: event.target.checked })
  }
  handdleUnlimitMinReachValue = (event) => {
    this.setState({ unlimitMinReachValue: event.target.checked })
  }

  render() {

    const {
      previewVisible,
      previewImage,
      fileList,
      selectedType,
      unlimitMaxReachValue,
      unlimitMinReachValue
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <ContentContainer>
        <FormContainer>
          <Headline>Create new Campaign</Headline>
          <Form layout="horizontal">
            <FormItem label="Choose goal type">
              <Radio.Group value={selectedType} onChange={this.handleCampaignType}>
                <Radio.Button value="money">Reach by money</Radio.Button>
                <Radio.Button value="people">Reach by people</Radio.Button>
              </Radio.Group>

            </FormItem>
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
                onPreview={this.handleUploadPreview}
                onChange={this.handleUploadChange}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleUploadCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </FormItem>
            <FormItem label="Maximum amount to reach">
              <InputNumber
                disabled={unlimitMaxReachValue}
                defaultValue={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                min={0}
                onChange={this.handleMaxReachValue}
              />
              <Checkbox onChange={this.handdleUnlimitMaxReachValue}>Unlimit</Checkbox>
            </FormItem>
            <FormItem label="Minimum amount to reach">
              <InputNumber
                disabled={unlimitMinReachValue}
                defaultValue={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                min={0}
                onChange={this.handleMinReachValue}
              />
              <Checkbox onChange={this.handdleUnlimitMinReachValue}>Unlimit</Checkbox>
            </FormItem>
            <FormItem label="Campaign Start - End">
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['Start Time', 'End Time']}
                onChange={(value, dateString) => console.log(dateString)}
                onOk={(value) => console.log(value)}
              />
            </FormItem>
          </Form>
          <div>
            <Button type="primary">Apply</Button>˝
          </div>
        </FormContainer>
      </ContentContainer>
    )
  }
}


export default NewCampaign
