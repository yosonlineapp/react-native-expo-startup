import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import HeaderTop from '../components/header';
import { fetchDataAll } from '../actions/user';

interface Props {
  navigation: any,
  fetchDataAll: any
}

interface State {
  isLoading: boolean
}

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
			isLoading: false
    }
	}

  userLogin = () => {
    const { fetchDataAll } = this.props;
    fetchDataAll();
  }

  render() {
    return (
      <Container>
        <HeaderTop />
        <Container style={{display: 'flex', justifyContent: 'center'}}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true}/>
              </Item>
              <Button style={{marginTop: 10}} onPress={this.userLogin}>
                <Text>LOGIN</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => {
  return{
    data: state.app.data,
  }
}

const mapDispatchToProps = {
  fetchDataAll
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);