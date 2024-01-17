#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PREC_STACK } from '../lib/prec-stack';

const app = new cdk.App();
new PREC_STACK(app, 'PrecStack', {});
