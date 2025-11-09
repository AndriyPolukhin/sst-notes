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

```
Test the API
Now we are ready to test our new API.

Change indicator Run the following in your terminal.

Copycurl -X POST \
-H 'Content-Type: application/json' \
-d '{"content":"Hello World","attachment":"hello.jpg"}' \
<YOUR_Api>/notes
Replace <YOUR_Api> with the Api from the output above. For example, our command will look like:

Copycurl -X POST \
-H 'Content-Type: application/json' \
-d '{"content":"Hello World","attachment":"hello.jpg"}' \
https://5bv7x0iuga.execute-api.us-east-1.amazonaws.com/notes




Test the API
Let’s test the get notes API. In the previous chapter we tested our create note API. It should’ve returned the new note’s id as the noteId.

Change indicator Run the following in your terminal. Remember to replace the generated subdomain and region with the values generated earlier.

Copy$ curl https://<generated_subdomain>.execute-api.<aws_region>.amazonaws.com/notes/<NOTE_ID>


Test the API
Let’s test list all notes API.

Change indicator Run the following in your terminal.

Copy$ curl https://5bv7x0iuga.execute-api.us-east-1.amazonaws.com/notes
Again, replacing the example URL with your Api value.

Since we are making a simple GET request, we could also go to this URL directly in your browser.

The response should look something like this.

Copy[{"attachment":"hello.jpg","content":"Hello World","createdAt":1629336889054,"noteId":"a46b7fe0-008d-11ec-a6d5-a1d39a077784","userId":"123"}]
Note that, we are getting an array of notes. Instead of a single note.


Test the API
Now we are ready to test the new API. In an earlier chapter we tested our create note API. It should’ve returned the new note’s id as the noteId.

Change indicator Run the following in your terminal.

Copy$ curl -X PUT \
-H 'Content-Type: application/json' \
-d '{"content":"New World","attachment":"new.jpg"}' \
https://5bv7x0iuga.execute-api.us-east-1.amazonaws.com/notes/<NOTE_ID>
Make sure to replace the id at the end of the URL with the noteId from before.


Test the API
Let’s test the delete note API.

In a previous chapter we tested our create note API. It should’ve returned the new note’s id as the noteId.

Change indicator Run the following in your terminal.

Copy$ curl -X DELETE https://5bv7x0iuga.execute-api.us-east-1.amazonaws.com/notes/<NOTE_ID>
Make sure to replace the id at the end of the URL with the noteId from before.

Here we are making a DELETE request to the note that we want to delete. The response should look something like this.


Create a Test User
We’ll use AWS CLI to sign up a user with their email and password.

Change indicator In your terminal, run.

Copy$ aws cognito-idp sign-up \
  --region <COGNITO_REGION> \
  --client-id <USER_POOL_CLIENT_ID> \
  --username admin@example.com \
  --password Passw0rd!
Make sure to replace COGNITO_REGION and USER_POOL_CLIENT_ID with the Region and UserPoolClient from above.

Now we need to verify this email. For now we’ll do this via an administrator command.

Change indicator In your terminal, run.

Copy$ aws cognito-idp admin-confirm-sign-up \
  --region <COGNITO_REGION> \
  --user-pool-id <USER_POOL_ID> \
  --username admin@example.com
Replace the COGNITO_REGION and USER_POOL_ID with the Region and UserPool from above.


Test the APIs
Let’s quickly test our APIs with authentication.

To be able to hit our API endpoints securely, we need to follow these steps.

Authenticate against our User Pool and acquire a user token.
With the user token get temporary IAM credentials from our Identity Pool.
Use the IAM credentials to sign our API request with Signature Version 4.
These steps can be a bit tricky to do by hand. So we created a simple tool called AWS API Gateway Test CLI.

Copy$ npx aws-api-gateway-cli-test \
--user-pool-id='<USER_POOL_ID>' \
--app-client-id='<USER_POOL_CLIENT_ID>' \
--cognito-region='<COGNITO_REGION>' \
--identity-pool-id='<IDENTITY_POOL_ID>' \
--invoke-url='<API_ENDPOINT>' \
--api-gateway-region='<API_REGION>' \
--username='admin@example.com' \
--password='Passw0rd!' \
--path-template='/notes' \
--method='POST' \
--body='{"content":"hello world","attachment":"hello.jpg"}'



```
