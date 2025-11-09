import { api } from './api'
import { bucket } from './storage'

const region = aws.getRegionOutput().name

/**
 * The CognitoUserPool component creates a Cognito User Pool for us.
 * We are using the usernames prop to state that we want our users to login with their email.
 */
export const userPool = new sst.aws.CognitoUserPool('UserPool', {
	usernames: ['email'],
})

/**
 * We are using addClient to create a client for our User Pool.
 * You create one for each “client” that’ll connect to it.
 * Since we only have a frontend we only need one. You can later add another if you add a mobile app for example.
 */
export const userPoolClient = userPool.addClient('UserPoolClient')

/**
 * The CognitoIdentityPool component creates an Identity Pool.
 * The attachPermissionsForAuthUsers function allows us to specify the resources our authenticated users have access to.
 */
export const identityPool = new sst.aws.CognitoIdentityPool('IdentityPool', {
	userPools: [
		{
			userPool: userPool.id,
			client: userPoolClient.id,
		},
	],
	permissions: {
		authenticated: [
			{
				actions: ['s3:*'],
				resources: [
					$concat(
						bucket.arn,
						'/private/${cognito-identity.amazonaws.com:sub}/*',
					),
				],
			},
			{
				actions: ['execute-api:*'],
				resources: [
					$concat(
						'arn:aws:execute-api:',
						region,
						':',
						aws.getCallerIdentityOutput({}).accountId,
						':',
						api.nodes.api.id,
						'/*/*/*',
					),
				],
			},
		],
	},
})
