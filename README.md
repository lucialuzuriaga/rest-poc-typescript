# **REST API testing with Jest and SuperTest**

## **Requirements**

- NodeJS: https://nodejs.org/en
- NPM: `npm install -g npm`
- Repository: `https://github.com/lucialuzuriaga/rest-poc-typescript.git`

## Installation
- Clone the repository `git clone https://github.com/lucialuzuriaga/rest-poc-typescript.git`
- Open Terminal and navigate to the root of the repository. Run `npm install`. Note: if you get permission denied, you may have to use `sudo`.
- To add a minimum security layer, environment variables are encrypted. To decrypt, run `cryptify decrypt config/config.ts -p YourSecretPassword`
- To execute the tests, run `npx jest tests/specs/user-crud.spec.ts`

That's it! Have fun!
