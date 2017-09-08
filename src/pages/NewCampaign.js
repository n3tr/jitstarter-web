import React, { Component } from 'react'
import styled from 'styled-components'
import { gql, graphql, withApollo } from 'react-apollo';
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

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Content } = Layout;
const config = require('../config')

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
    maxReachValue: 0,
    minReachValue: 0,
    unlimitMaxReachValue: false,
    unlimitMinReactValue: false,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    phone: ''
  }

  constructor(props) {
    super(props)
  }

  // -- Upload handlr
  handleUploadCancel = () => this.setState({ previewVisible: false })
  handleUploadPreview = (file) => {
    console.log('handleUploadPreview', file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleUploadChange = ({ fileList }) => {
    console.log('handleUploadChange', fileList)
    this.setState({ fileList })
  }

  // -- Campaign type handlr
  handleCampaignType = (event) => {
    this.setState({ selectedType: event.target.value })
  }

  // -- Reach amount handlr
  handleMaxReachValue = (value) => {
    this.setState({ maxReachValue: value })
  }

  handleMinReachValue = (value) => {
    this.setState({ minReachValue: value })
  }

  // -- Checkbox handlr
  handdleUnlimitMaxReachValue = (event) => {
    this.setState({ unlimitMaxReachValue: event.target.checked })
  }
  handdleUnlimitMinReachValue = (event) => {
    this.setState({ unlimitMinReachValue: event.target.checked })
  }

  // -- Text Change
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleDetailChange = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  handleDateChange = (value, dateString) => {
    const startDate = value[0]
    const endDate = value[1]

    this.setState({
      startDate,
      endDate
    })
  }

  handlePhoneChange = (event) => {
    this.setState({
      phone: event.target.value
    })
  }

  handleSubmit = () => {
    console.log(this.state)
    const images = this.state.fileList.map(file => {
      const response = file.response
      return response.url
    })

    const name = this.state.name
    const description = this.state.description
    const goalType = this.state.selectedType
    const minimumGoal = parseInt(this.state.minReachValue)
    const maximumGoal = parseInt(this.state.maxReachValue)
    const isUnlimit = this.state.unlimitMaxReachValue
    const startDate = this.state.startDate.toISOString()
    const endDate = this.state.endDate.toISOString()
    const promptPayMobile = this.state.phone

    console.log({
      name, description, goalType, minimumGoal, maximumGoal, isUnlimit, startDate, endDate, images
    })

    this.props.mutate({
      variables: {
        name, description, goalType, minimumGoal, maximumGoal, isUnlimit, startDate, endDate, images
      }
    }).then((res) => {
      const id = res.data.createCampaign.id
      this.props.history.replace('/campaign/' + id)
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      selectedType,
      unlimitMaxReachValue,
      unlimitMinReachValue,
      maxReachValue,
      minReachValue
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
              <Input placeholder="Name..."
                onChange={this.handleNameChange}
                value={this.state.name} />
            </FormItem>
            <FormItem label="Describe what you’ll be creating.">
              <TextArea rows={4}
                onChange={this.handleDetailChange}
                value={this.state.description} />
            </FormItem>
            <FormItem label="Promote images">
              <Upload
                action={`${config.GRAPHQL_HOST}/upload/`}
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
            
            <FormItem label="Minimum goal to reach">
              <InputNumber
                disabled={unlimitMinReachValue}
                value={minReachValue}
                min={0}
                onChange={this.handleMinReachValue}
              />
            </FormItem>

            <FormItem label="Maximum goal">
              <InputNumber
                disabled={unlimitMaxReachValue}
                value={maxReachValue}
                min={0}
                onChange={this.handleMaxReachValue}
              />
              <Checkbox onChange={this.handdleUnlimitMaxReachValue}>Unlimit</Checkbox>
            </FormItem>
            
            <FormItem label="Campaign Start - End">
              <RangePicker

                format="YYYY-MM-DD"
                placeholder={['Start Time', 'End Time']}
                onChange={this.handleDateChange}
                onOk={this.handleDateChange}
              />
            </FormItem>

            {this.state.selectedType === 'money' ? (
              <FormItem label="Phone for PromtPay">
                <Input
                  value={this.state.phone}
                  onChange={this.handlePhoneChange}
                />
              </FormItem>
            ) : null}

          </Form>

          <Button type="primary" onClick={this.handleSubmit}>Apply</Button>
        </FormContainer>
      </ContentContainer>
    )
  }
}

const submitCampaign = gql`
  mutation createCampaign(
    $name: String!, 
    $description: String!
    $goalType: String!, 
    $endDate: String!, 
    $minimumGoal: Int!, 
    $maximumGoal: Int!, 
    $isUnlimit: Boolean,
    $promptPayMobile: String,
    $images: [String]!) {
    createCampaign(
      name: $name,
      description: $description,
      goalType: $goalType,
      startDate: $endDate
      endDate: $endDate,
      minimumGoal: $minimumGoal,
      maximumGoal: $maximumGoal,
      isUnlimit: $isUnlimit,
      images: $images,
      promptPayMobile: $promptPayMobile
    ) {
      id
      name
      creator {
        id
        name
        picture
      }
      goalType
      minimumGoal
      maximumGoal
      current
      endDate
      startDate
      isUnlimit
      images
      qrCode
    }
  }
`;

export default graphql(submitCampaign)(NewCampaign)
