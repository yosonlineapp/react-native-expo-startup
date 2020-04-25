import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Card, CardItem, Body, Text } from 'native-base';
import HeaderTop from '../components/header';
import BottomTab from '../components/tab';

interface Props {
	navigation: any
}

export default class Home extends Component<Props> {
  render() {
    return (
			<Container>
				<HeaderTop />
				<ScrollView style={{padding: 10}}>
					<Card>
            <CardItem>
              <Body>
                <Text>
                  TEST
                </Text>
              </Body>
            </CardItem>
          </Card>
				</ScrollView>
				<BottomTab navigation={this.props.navigation} activeTab={0}/>
			</Container>
		);
  }
}