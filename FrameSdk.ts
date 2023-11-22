export const BaseHtml = (`
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`)

export const FrameSdk = `
  let provider;
  let iframe;

  const init = async () => {
    const { W3mFrameProvider } = await import("https://esm.sh/@web3modal/smart-account@3.4.0-e3959a31")
    provider = new W3mFrameProvider("PROJECT_ID")
    initFrame();
  }

  init();
  
  const initFrame = () => {
    iframe = document.createElement('iframe')
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
  }


  // ------------- Helpers -----------------------
  const checkConnected = async () => {
    const { isConnected } = await provider.isConnected();
    window.ReactNativeWebView.postMessage(JSON.stringify({ isConnected }))
  }

  const connectEmail = async (email) => {
    const { action } = await provider.connectEmail({ email })
    window.ReactNativeWebView.postMessage(JSON.stringify({ action }))
  }
`

export const isConnected = () => {
  return `
    setTimeout(() => {
      checkConnected();
    }, 100)
  `
}

export const connectEmail = (email:string) => {
  return `
    setTimeout(() => {
      connectEmail("${email}");
    }, 100)
  `
}
