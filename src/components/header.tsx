import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderTop extends Component {
  render() {
    return (
			<Header>
				<Left/>
				<Body>
					<Title>Title</Title>
				</Body>
				<Right />
			</Header>
		);
  }
}