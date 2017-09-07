import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { Progress, Card, Button, InputNumber, Form } from 'antd';
import Countdown from 'react-countdown-now';

const FormItem = Form.Item;

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
              daysInHours
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
          <JoinedList>
            {joined.map((item) => (<Item>{item}</Item>))}
          </JoinedList>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card title="Join Campaign">
          {type === 'money' &&
            <Form>
              <FormItem label="Fill amount">
                <InputNumber
                  defaultValue={0}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  min={0}
                  onChange={onChange}
                />
              </FormItem>
            </Form>
          }
          <Button type="primary">Join!</Button>
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

DetailBox.defaultProps = {
  type: 'people'
}

export default DetailBox
