/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import TrackPlayer from 'react-native-track-player'; // Import TrackPlayer

// Setup the player before rendering the app
// TrackPlayer.setupPlayer().then(() => {
//   AppRegistry.registerComponent(appName, () => App);
// });

// import TrackPlayer from 'react-native-track-player';
TrackPlayer.registerPlaybackService(() => require('./services.js'));
// TrackPlayer.setupPlayer({}).then(async () => {
// })
// // TrackPlayer.registerPlaybackService(() => playbackService);
AppRegistry.registerComponent(appName, () => App);
