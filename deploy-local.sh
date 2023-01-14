#!/bin/bash

git pull && pm2 restart 0 && pm2 log
