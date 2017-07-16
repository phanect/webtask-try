#!/bin/bash

wt create --secrets-file=secrets.txt --dependency=sendgrid@^5.1.2 wt-try.js
