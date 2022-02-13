
# Project dependencies

* Node version: 16.3.0

* 

# Available Scripts

In the project directory, you can run:

### Use proper node version

`nvm use 16.3.0`

This asumed you already have nvm installed on your machine

### Installing dependencies

`yarn install`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

### Display Payment screen in an external website

   ```html
<div
        id="paycruiser-iframe"
        style="position: fixed;top: 0px; left: 0px; right: 0px; bottom: 0px; width: 100vw; height: 100vh; background-color: #004973aa; z-index: 9999; visibility: hidden; overflow-y: scroll;"
      >
        <div
          id="modal-close"
          onclick="document.getElementById('paycruiser-iframe').style.visibility = 'hidden'"
          style="position: fixed;top: 10px; right: 10px; width: 30px; height: 30px; z-index: 9999; font-size: 30px; font-weight: bold; color: white; cursor: pointer;"
        >
          x
        </div>
        <iframe
          src="https://www.paycruiser.com/widget/pay-bill"
          width="100%"
          height="100vh"
          frameBorder="0"
          style="border-width: 0px; width: 100%; position: absolute; top: 30%; right: 0px; left: 0px; border: 0px; height: 100%;"
          
        ></iframe>
      </div>
   ```