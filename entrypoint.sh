#!/bin/bash

if [[ $NODE_ENV = 'development' ]]
then
    npm install

    npm run build
fi

npm start