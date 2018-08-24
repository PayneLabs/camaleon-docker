#! /bin/bash
set -e

bundle check || bundle install --without development test