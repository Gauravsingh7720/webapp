#!/bin/bash
  cd /home/ec2-user/webapp
  node app.js > app.log 2>&1 &
