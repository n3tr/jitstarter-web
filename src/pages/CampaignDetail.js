import React, { Component } from 'react'
import styled from 'styled-components'
import DetailBox from '../components/DetailBox'
import { graphql, gql, withApollom, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import moment from 'moment'
import {
  Layout,
  Row,
  Col,
  Card,
  Carousel,
  Avatar,
  InputNumber,
  Form,
  Button
} from 'antd'

const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;

const ContentContainer = styled(Content) `
 padding: 24px;
`
const Headline = styled.h1`
 color: dimgray;
`
const ImageStyle = styled.img`
 height: 400px;
 width: 100%;
 overflow: hidden;
`
const CardContainer = styled.div`
 padding: 0 10px 10px 0;
`
const OwnerStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const ImageContainer = styled.div`
 position: relative;
 background-size: cover;
`

class CampaignDetail extends Component {

  state = {
    supporterAmount: null,

  }

  joinButtonPress = (props) => {
    const campaign = this.props.data.campaign
    if (campaign.goalType === "money") {
      if (this.state.supporterAmount == null) {
        alert('Please fill you money to support this campaign')
        return
      }
    }

    this.props.joinCampaign(campaign.id, this.state.supporterAmount)
      .then(({ data }) => {
        alert('joined!')
      })
      .catch((e) => {
        alert(e)
      })
  }


  render() {
    if (this.props.data.loading) {
      return <p>Loading...</p>
    }

    const campaign = this.props.data.campaign
    console.log(campaign)

    const expired = new Date(campaign.endDate)
    let reachText = 'N/A'
    if (campaign.minimumGoal <= 0) {
      reachText = `${campaign.current} / ${campaign.minimumGoal}`
    } else {
      reachText = `${campaign.current} / ${campaign.minimumGoal} ~ ${campaign.isUnlimit ? 'Unlimit' : campaign.maximumGoal}`
    }

    let images = null
    if (campaign.images.length > 0) {
      images = campaign.images.map((image, i) => <ImageContainer key={i}><ImageStyle src={image} /></ImageContainer>)
    }

    let percent = 0
    if (campaign.minimumGoal === 0) {
      percent = 100
    } else if (campaign.current === 0) {
      percent = 0
    } else {
      percent = campaign.minimumGoal / campaign.current
    }

    return (
      <ContentContainer>
        <Headline>{campaign.name}</Headline>
        <Row>
          <Col span={18}>
            <CardContainer>
              <Carousel autoplay>
                {images}
              </Carousel>
            </CardContainer>
            <Row>
              <CardContainer>
                <Card title="Description">
                  {campaign.description}
                </Card>
              </CardContainer>
            </Row>
            <Row>
              <CardContainer>
                <Card title="Owner">
                  <OwnerStyle>
                    <Avatar size="small" icon="user" /> {campaign.creator ? campaign.creator.name : 'unknonwn'}
                  </OwnerStyle>
                </Card>
              </CardContainer>
            </Row>
            <Row>
              <CardContainer>
                <Card title="Join Campaign">
                  {campaign.goalType === 'money' &&
                    <Form>
                      <FormItem label="Fill amount">
                        <InputNumber
                          defaultValue={0}
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          min={0}
                          onChange={(val) => this.setState({ supporterAmount: val })}
                        />
                      </FormItem>
                    </Form>
                  }
                  <Button onClick={this.joinButtonPress} type="primary">Join!</Button>
                </Card>
              </CardContainer>
            </Row>
          </Col>
          <Col span={6}>
            <DetailBox
              onChange={(e) => console.log(e)}
              type={campaign.goalType}
              reach={reachText}
              progress={percent}
              expire={expired}
              joined={campaign.supporters}
            />
          </Col>
        </Row>

      </ContentContainer>
    )
  }
}

const listCampaign = gql`
  query Campaign($id: String!) {
    campaign(id: $id) {
      id
      name
      creator {
        id
        name
        picture
      }
      supporters {
        user {
          id
          name
          picture
        }
        money
      }
      goalType,
      minimumGoal,
      maximumGoal,
      current,
      endDate,
      startDate,
      isUnlimit,
      images,
      description,
      qrCode
    }
  }
`

const joinCampaign = gql`
  mutation($campaignId: String!, $money: Int) {
    joinCampaign(campaignId: $campaignId, money: $money) {
      id
      name
      creator {
        id
        name
        picture
      }
      supporters {
        user {
          id
          name
          picture
        }
        money
      }
      goalType,
      minimumGoal,
      maximumGoal,
      current,
      endDate,
      startDate,
      isUnlimit,
      images,
      description,
      qrCode
    }
  }
`


export default compose(
  graphql(listCampaign, {
    options: (props) => {
      return { variables: { id: props.match.params.id } }
    }
  }),
  graphql(joinCampaign, {
    props: ({ mutate }) => ({
      joinCampaign: (campaignId, money) => mutate({
        variables: { campaignId, money }
      })
    })
  })
)(CampaignDetail)
