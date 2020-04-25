import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';
import HeaderTop from '../components/header';
import { ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import BottomTab from '../components/tab';
// import { WebView, } from 'react-native-webview';

interface Props {
	navigation: any
}

interface State {
	recording: any,
	timeRecord: number,
	soundData: any,
	isPlaying: boolean,
	recordStatus: boolean,
	resetStatus: boolean
}

export default class Play extends Component<Props, State> {
	constructor(props: Props) {
    super(props)

    this.state = {
			recording: null,
			timeRecord: 0,
			soundData: null,
			isPlaying: false,
			recordStatus: true,
			resetStatus: false
    }
	}

	startRecording = async() => {
		const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
		let { timeRecord, recording, recordStatus } = this.state;
		if (status !== 'granted') {
			Audio.requestPermissionsAsync();
		} else {
			if (recordStatus) {
				this.setState({recordStatus: false})
				Audio.setAudioModeAsync({
					playsInSilentModeIOS: true,
					allowsRecordingIOS: true,
					staysActiveInBackground: false
				});
	
				try {
					recording = new Audio.Recording();
					console.log(recording.getStatusAsync());
					
					await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
					await recording.startAsync();
					// console.log('You are now recording!');
					// console.log(recording.getStatusAsync());
		
					let checkTime = setInterval(async () => {
						if (timeRecord === 9) {
							recording.stopAndUnloadAsync().then(() => {
								this.setState({recording, timeRecord: 10, resetStatus: true});
							});
							clearInterval(checkTime);
						} else {
							timeRecord += 1;
							this.setState({timeRecord});
						}
					}, 1000);
					// You are now recording!
				} catch (error) {
					console.log(error);
					// An error occurred!
				}
			}
		}
	}

	startPlay = async () => {
		let { soundData, recording, timeRecord, isPlaying } = this.state;
		// const info = await FileSystem.getInfoAsync(recording.getURI());
		if (timeRecord === 10 && !isPlaying) {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				shouldDuckAndroid: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				playThroughEarpieceAndroid: false,
				staysActiveInBackground: true,
			});
			const { sound, status } = await recording.createNewLoadedSoundAsync(
				{
					isLooping: false,
					isMuted: false,
					volume: 1.0,
					rate: 1.0,
					shouldCorrectPitch: true,
				}, (status: any) => {
					this.setState({
						isPlaying: status.isPlaying
					})
				}
			);
			this.setState({
				soundData: sound
			}, () => {
				this.state.soundData.playAsync();
			});
		} else if (soundData) {
			soundData.pauseAsync();
			this.setState({
				isPlaying: false
			})
		}
	}

	resetRecord = async () => {
		let { soundData, recording } = this.state;
		if (soundData !== null) {
			await soundData.unloadAsync();
			soundData.setOnPlaybackStatusUpdate(null);
			soundData = null;
		}
		await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
		if (recording !== null) {
			recording.setOnRecordingStatusUpdate(null);
			recording = null;
		}
		this.setState({
			soundData,
			recording,
			timeRecord: 0,
			recordStatus: true,
			resetStatus: false
		});
	}

  render() {
		const { timeRecord, isPlaying, recordStatus, resetStatus } = this.state;
    return (
			<Container>
				<HeaderTop />
				<ScrollView style={{padding: 10}}>
					<Button style={{marginTop: 10}} onPress={() => {this.startRecording()}} disabled={!recordStatus || timeRecord > 0}>
						<Text>RECORD</Text>
					</Button>
					<Button style={{marginTop: 10}} onPress={() => {this.startPlay()}} disabled={timeRecord < 10}>
						<Text>{isPlaying ? 'STOP' : 'PLAY'}</Text>
					</Button>
					<Button style={{marginTop: 10}} onPress={() => {this.resetRecord()}} disabled={!resetStatus}>
						<Text>RESET</Text>
					</Button>
					<Text style={{marginTop: 10}}>{timeRecord.toString()}</Text>
				</ScrollView>
				<BottomTab navigation={this.props.navigation} activeTab={1}/>
			</Container>
		);
  }
}