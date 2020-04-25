import React, { Component } from 'react';
import { Container } from 'native-base';
import HeaderTop from '../components/header';
import BottomTab from '../components/tab';
import { WebView } from 'react-native-webview';

interface Props {
	navigation: any
}

export default class Official extends Component<Props> {
  render() {
    return (
			<Container>
				<HeaderTop />
				<Container>
					<WebView source={{ uri: 'https://yosapps.com' }} style={{ top:0 }} />
				</Container>
				<BottomTab navigation={this.props.navigation} activeTab={3}/>
			</Container>
		);
  }
}