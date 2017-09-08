import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { Progress, Card } from 'antd';
import Countdown from 'react-countdown-now';
import numeral from 'numeral'

const Content = styled.div`
  background-color: #fff;
  padding: 10px;
`

const Display = styled.h4`
  font-size: 30px;
  padding: 0 0 0 10px;
`

const CardContainer = styled.div`
  padding: 10px;
`

const ProgressStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
`

const TimeOutStyle = styled.p`
  color: tomato;
  font-size: 24px;
  font-weight: bold;
`

const JoinedList = styled.ul`
  padding: 0px;
`
const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 4px;
`

const DetailBox = ({ expire, progress, reach, joined, type, onChange }) => {

  return (
    <Content>
      <CardContainer>
        <Card title="Expire in">
          <Display>
            <Countdown
              //daysInHours
              date={expire}>
              <TimeOutStyle>Time Out!</TimeOutStyle>
            </Countdown>
          </Display>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card title="Reach">
          <ProgressStyle>
            <Progress type="circle" percent={progress} />
            <Display>{reach}</Display>
          </ProgressStyle>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card title="Who's Joined!">
          {joined.length > 0 ?
            <JoinedList>
              {joined.map((item) => (<Item>{item.user.name} {item.money ? ` - ฿${numeral(item.money).format('0,0.00')}` : null}</Item>))}
            </JoinedList>
            : 'N/A'}
        </Card>
      </CardContainer>
    </Content>
  )
}

DetailBox.propTypes = {
  expire: propTypes.func.isRequired,
  progress: propTypes.number.isRequired,
  reach: propTypes.string.isRequired,
  joined: propTypes.array.isRequired
}


export default DetailBox
