import AWS from 'aws-sdk/dist/aws-sdk-react-native';

var bucketName = 'crimsonbazaar-dev';
var bucketRegion = 'us-east-1	';
var IdentityPoolId = 'us-east-1:716c666e-b79c-4a12-a400-5c19a1acd4e3';

// AWS.config.update({
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId
//   })
// });

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:716c666e-b79c-4a12-a400-5c19a1acd4e3',
});

export const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketName }
});
