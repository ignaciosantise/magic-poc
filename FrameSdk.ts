export const FrameSdk = `
  const iframe = document.createElement('iframe')
  iframe.id = 'w3m-iframe'
  iframe.src = 'https://secure-web3modal-dpv0ya66p-walletconnect1.vercel.app/sdk'
  document.body.appendChild(iframe)
  
  iframe.onload = () => {
    window.addEventListener('message', ({ data }) => {
      window.ReactNativeWebView.postMessage(JSON.stringify(data))
    })
  }

  iframe.onerror = () => {
    window.ReactNativeWebView.postMessage("ERROR")
  }
`

export const isConnected = () => (`
  iframe.contentWindow.postMessage({
    "type": "@w3m-app/IS_CONNECTED",
    "payload": undefined
  }, '*')
`)

export const connectEmail = () => (`
  iframe.contentWindow.postMessage({
    "type": "@w3m-app/CONNECT_EMAIL",
    "payload": { email: "nacho@walletconnect.com"}
  }, '*')
`)
