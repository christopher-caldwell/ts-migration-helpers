#!/bin/sh

Red="\033[0;31m"    # Red
BICyan="\033[1;96m" # Bold Cyan
Color_Off="\033[0m" # Text Reset

printf "\n\n$BICyan$(echo Checking types)$Color_Off\n\n"
yarn type-check

if [ $? != 0 ]; then
  exit 1
fi

printf "\n\n$BICyan$(echo Linting)$Color_Off\n\n"
yarn lint

if [ $? != 0 ]; then
  exit 1
fi

printf "\n\n$BICyan$(echo Building API from source)$Color_Off\n\n"
yarn build:release
