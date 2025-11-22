#!/bin/sh

set -e

if [ ! -d node_modules ]; then
    npm install
fi

exec /usr/local/bin/docker-entrypoint.sh "$@"