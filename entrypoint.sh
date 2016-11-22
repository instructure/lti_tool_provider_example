#!/bin/bash
set -e

rm -f tmp/pids/server.pid

eval 'bundle exec rails s -p 8080'
