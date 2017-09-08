import React, { Component } from 'react'
import styled from 'styled-components'
import DetailBox from '../components/DetailBox'
import { graphql, gql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import {
  Layout,
  Row,
  Col,
  Card,
  Carousel,
  Avatar
} from 'antd'

const { Header, Content, Footer } = Layout;

const ContentContainer = styled(Content) `
padding: 24px;
`

const Headline = styled.h1`
color: dimgray;
`
const ImageStyle = styled.img`
max-width: 100%;
max-height: 100%;
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

class CampaignDetail extends Component {

  render() {
    if (this.props.data.loading) {
      return <p>Loading...</p>
    }

    const campaign = this.props.data.campaign

    return (
      <ContentContainer>
        <Headline>Campaign name awesome</Headline>
        <Row>
          <Col span={18}>
            <CardContainer>
              <Carousel autoplay>
                <div><ImageStyle src="https://images.unsplash.com/photo-1501940740999-480321d51e5a?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=" /></div>
                <div><ImageStyle src="https://images.unsplash.com/photo-1502236928994-d4db1522a6d4?dpr=2&auto=compress,format&fit=crop&w=568&h=852&q=80&cs=tinysrgb&crop=" /></div>
                <div><ImageStyle src="https://images.unsplash.com/photo-1483678342228-f583a0f5ca96?dpr=2&auto=compress,format&fit=crop&w=568&h=279&q=80&cs=tinysrgb&crop=" /></div>
                <div><ImageStyle src="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=" /></div>
              </Carousel>
            </CardContainer>
            <Row>
              <CardContainer>
                <Card title="Description">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Card>
              </CardContainer>
            </Row>
            <Row>
              <CardContainer>
                <Card title="Owner">
                  <OwnerStyle>
                    <Avatar size="small" icon="user" /> Yuttana
                  </OwnerStyle>
                </Card>
              </CardContainer>
            </Row>
          </Col>
          <Col span={6}>
            <DetailBox
              onChange={(e) => console.log(e)}
              type="money"
              reach="240 / 600 ~ 1,200"
              progress={30}
              expire={Date.now() + 10000}
              joined={[
                'adh',
                'net',
                'bird',
                'bookn',
                'ying'
              ]}
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
      creator
      goalType,
      minimumGoal,
      maximumGoal,
      current,
      endDate,
      startDate,
      isUnlimit,
      images
    }
  }
`

export default graphql(listCampaign, {
  options: (props) => {
    return { variables: { id: props.match.params.id } }
  }
})(CampaignDetail)
