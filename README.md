# Node.Js E-Wallet backend

- an E-Wallet backend simple service for the E-wallet react native application.

- used this service for the react native app [check E-wallet app](https://github.com/medomy/wallet_app_mobile)

## installation

clone the repo first
```bash
  npm clone git@github.com:medomy/e-wallet-backend-public.git
  cd e-wallet-backend-public
```
then you have to add your environment variables in a .env file in the root directory
```.env
PORT = number

CONNECTION_STRING = local or atlas mongodb

BCRYPT_PASSWORD = password for bcrypt

SALT_ROUNDS = salt

TOKEN_SECRET_ADMIN = secret
TOKEN_SECRET_NORMAL = secret
```
then start the app 
```bash
  npm i
  npm start
```
## Tech Stack

**Client:** React-Native, redux, Typescript , Axios , RTK

**Server:** this is the server service code and you can check the deployed one[deployed api](https://ewalletbackend.onrender.com/api/v1)

## Used endpoints

- there will be a swagger version to show the endpoints
