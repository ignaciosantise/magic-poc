import { useRef, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import { BaseHtml, FrameSdk, connect, connectEmail, isConnected, verifyOtp } from './FrameSdk';

export default function App() {
  const webviewRef = useRef<WebView>(null);
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  const onIsConnected = () => {
    const message = isConnected();
    webviewRef.current?.injectJavaScript(message)
  }

  const onConnectEmail = () => {
    const message = connectEmail(email);
    webviewRef.current?.injectJavaScript(message)
  }

  const onVerifyOtp = () => {
    const message = verifyOtp(otp);
    webviewRef.current?.injectJavaScript(message)
  }

  const onConnect = () => {
    const message = connect();
    webviewRef.current?.injectJavaScript(message)
  }

  const handleMessage = (event: any) => {
    console.log('SECURE RESPONSE: ', event.nativeEvent.data)
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.action}>
          <TouchableOpacity onPress={onIsConnected} style={styles.button}>
            <Text>IS_CONNECTED</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <TextInput autoCapitalize='none' style={styles.input} onChangeText={setEmail} placeholder="Enter your email" />
          <TouchableOpacity onPress={onConnectEmail} style={styles.button}>
            <Text>CONNECT_EMAIL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <TextInput autoCapitalize='none' style={styles.input} onChangeText={setOtp} placeholder="Enter OTP" />
          <TouchableOpacity onPress={onVerifyOtp} style={styles.button}>
            <Text>VERIFY_OTP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <TouchableOpacity onPress={onConnect} style={styles.button}>
            <Text>CONNECT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <WebView
        ref={webviewRef}
        containerStyle={styles.webview}
        originWhitelist={['*']}
        onMessage={handleMessage}
        source={{ html: BaseHtml }}
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
  action: {
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center',
    gap: 8
  },
  button: {
    backgroundColor:'#eaeaea',
    borderRadius: 30,
    padding:10,
    width: 140,
    alignItems:'center'
  },
  input:{
    backgroundColor:'#eaeaea',
    borderRadius: 30,
    width: 200,
    padding:10
  },
  webview: {
    width: 0,
    height: 0,
    position:'absolute'
  }
})