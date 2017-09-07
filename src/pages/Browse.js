import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
const { Content } = Layout

const CampaignContainer = styled.div`
  min-width: 300px;
  flex: 1;
  padding: 8px;
`

const CampaignInner = styled.div`
background: #fff;
border: 1px solid #ddd;
border-radius: 3px;
`

const ImageContainer = styled.div`
  position: relative;
  padding-top: 66.6667%;
  background: rgb(216, 216, 216);
`

const ImageAbs = styled.div`
position: absolute;
top: 0px;
bottom: 0px;
left: 0px;
right: 0px;
height: 100%;
width: 100%;
background: transparent url(${props => props.src});
background-size: cover;
`

const CampaignImageDiv = styled.div`
  width: 100%;
  background: transparent url(${props => props.src})
`


const CardBody = styled.div`
  padding: 4px 8px;
`

const CampaignItem = (props) => {
  return (
    <CampaignContainer>
      <CampaignInner>
        <ImageContainer>
          <ImageAbs src={props.campaign.image} />
        </ImageContainer>
        <CardBody>
          Test
        </CardBody>
      </CampaignInner>
    </CampaignContainer>
  )
}

export default class Browse extends React.Component {
  render() {
    return (
      <Content style={{ padding: '50px 50px', display: 'flex', direction: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: 12 }).map((i, index) => {
          return <CampaignItem key={index} campaign={{
            image: index % 2 === 0 ? 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' : 'https://ksr-ugc.imgix.net/assets/017/906/988/cb35b162a455cc137957a27550c24f09_original.jpg?crop=faces&w=560&h=315&fit=crop&v=1503731494&auto=format&q=92&s=a5e17f688fbb11a57281a837255660a9'
          }}/>
        })}
      </Content>
    )
  }
}