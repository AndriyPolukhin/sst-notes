# The demo app is a single page application powered by a serverless API written completely in TypeScript.

It is relatively simple application but we are going to address the following requirements.

-   [ ] Should allow users to signup and login to their accounts
-   [ ] Users should be able to create notes with some content
-   [ ] Each note can also have an uploaded file as an attachment
-   [ ] Allow users to modify their note and the attachment Users can also delete their notes
-   [ ] The app should be able to process credit card payments
-   [ ] App should be served over HTTPS on a custom domain
-   [ ] The backend APIs need to be secure
-   [ ] The app needs to be responsive
-   [ ] The app should be deployed when we git push

## Technologies & Services

We will be using the following set of technologies and services to build our serverless application.

-   [ ] AWS S3 for file uploads
-   [ ] DynamoDB for our database
-   [ ] Lambda & API Gateway for our serverless
-   [ ] API Cognito for user authentication and management
-   [ ] React for our frontend Bootstrap for the UI Kit
-   [ ] React Router for routing
-   [ ] Vite for building our single page app
-   [ ] Vitest for our unit tests
-   [ ] GitHub for hosting our project repos
-   [ ] Stripe for processing credit card payments

> Requirements You just need a couple of things to work through this guide:

Node v20 and npm v10

A GitHub account

Basic knowledge of JavaScript and TypeScript

And basic knowledge of how to use the command line

How This Guide Is Structured

The guide is split roughly into a couple of parts:

### For the backend:

-   [ ] Configure your AWS account
-   [ ] Create your database using DynamoDB
-   [ ] Set up S3 for file uploads
-   [ ] Write the various backend APIs
-   [ ] Set up Cognito User Pools to manage user accounts
-   [ ] Set up Cognito Identity Pool to secure our resources
-   [ ] Working with secrets
-   [ ] Adding unit tests

### For the frontend:

-   [ ] Set up our project with Create React App
-   [ ] Add favicons, fonts, and a UI Kit using Bootstrap
-   [ ] Set up routes using React Router
-   [ ] Use AWS Cognito with Amplify to login and signup users
-   [ ] Plugin to the backend APIs to manage our notes
-   [ ] Use the AWS Amplify to upload files
-   [ ] Accepting credit cards with the Stripe
-   [ ] React SDK

### Deploying to prod:

-   [ ] Use a custom domain for your app
-   [ ] Deploy your app when you push to git
