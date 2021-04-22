#!/bin/sh

yarn build

if [ $? != 0 ]; then
  exit 1
fi

aws s3 sync ./build/ s3://$S3_BUCKET
