import { useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { FrameSdk, connectEmail, isConnected } from './FrameSdk';

export default function App() {
  const webviewRef = useRef<WebView>(null);

  const onIsConnected = () => {
    const message = isConnected();
    webviewRef.current?.injectJavaScript(message)
  }

  const onConnectEmail = () => {
    const message = connectEmail();
    webviewRef.current?.injectJavaScript(message)
  }

  const handleMessage = (event: any) => {
    console.log('SECURE RESPONSE: ', event.nativeEvent.data)
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={onIsConnected} style={styles.button}>
          <Text>IS_CONNECTED</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onConnectEmail} style={styles.button}>
          <Text>CONNECT_EMAIL</Text>
        </TouchableOpacity>
      </View>
      <WebView
        ref={webviewRef}
        containerStyle={styles.webview}
        originWhitelist={['*']}
        onMessage={handleMessage}
        source={{ html: '<div></div>' }}
        injectedJavaScript={FrameSdk}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    gap: 10
  },
  button: {
    backgroundColor:'#eaeaea',
    borderRadius: 30,
    padding:10
  },
  webview: {
    width: 0,
    height: 0,
    position:'absolute'
  }
})