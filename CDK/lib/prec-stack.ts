import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda } from 'aws-cdk-lib';
import { aws_secretsmanager } from 'aws-cdk-lib';

export class PREC_STACK extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const secrets = aws_secretsmanager.Secret.fromSecretCompleteArn(this, 'PrecBackend_Lambda_Secrets', "arn:aws:secretsmanager:us-east-1:203711690697:secret:prod/PrecBackend/lambda-lEeHsA");
    const DB_CONNECTION = secrets.secretValueFromJson("DB_CONNECTION").unsafeUnwrap();
    const JWT_KEY = secrets.secretValueFromJson("JWT_KEY").unsafeUnwrap();
    const MAILCHIMP_API_KEY = secrets.secretValueFromJson("MAILCHIMP_API_KEY").unsafeUnwrap();
    const MAILCHIMP_LIST_ID = secrets.secretValueFromJson("MAILCHIMP_LIST_ID").unsafeUnwrap();
    const MAILCHIMP_SERVER_CODE = secrets.secretValueFromJson("MAILCHIMP_SERVER_CODE").unsafeUnwrap();

    const lambda = new aws_lambda.Function(this, 'PrecBackend_Lambda', {
        runtime: aws_lambda.Runtime.NODEJS_14_X,
        handler: 'app.handler',
        code: aws_lambda.Code.fromAsset('../Backend'),
        environment:{
            DB_CONNECTION: DB_CONNECTION, 
            JWT_KEY: JWT_KEY, 
            MAILCHIMP_API_KEY: MAILCHIMP_API_KEY,
            MAILCHIMP_LIST_ID: MAILCHIMP_LIST_ID, 
            MAILCHIMP_SERVER_CODE: MAILCHIMP_SERVER_CODE 
        }
    });

    const url = new aws_lambda.FunctionUrl(this, 'PrecBackend_Lambda_URL',{
        function: lambda
    });
  }
}
