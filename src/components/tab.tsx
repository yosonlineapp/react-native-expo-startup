import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text, Badge, Icon } from 'native-base';

interface Props {
	navigation: any,
	activeTab: number
}

export default class FooterTabsExample extends Component<Props> {
  render() {
		const {navigation, activeTab} = this.props;
    return (
		<Footer>
			<FooterTab>
				<Button vertical active={activeTab === 0} onPress={() => {
            navigation.navigate('HomeScreen')}}>
					<Icon name="home" />
					<Text>ホーム</Text>
				</Button>
				<Button vertical active={activeTab === 1} onPress={() => {
            navigation.navigate('PlayScreen')}}>
					<Icon name="chatbubbles" />
					<Text>プレイ</Text>
				</Button>
				<Button vertical active={activeTab === 2} onPress={() => {
            navigation.navigate('FriendScreen')}}>
					<Icon name="people" />
					<Text>フレンド</Text>
				</Button>
				<Button active={activeTab === 3} onPress={() => {
            navigation.navigate('OfficialScreen')}}>
					<Icon name="apps" />
					<Text>サイト</Text>
				</Button>
			</FooterTab>
	  </Footer>
    );
  }
}