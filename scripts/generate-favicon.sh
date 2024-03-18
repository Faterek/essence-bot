#!/bin/bash
if ! [ -x "$(command -v convert)" ]; then
  echo 'Error: convert command not found. Please install imagemagick.' >&2
  exit 1
fi

cd "$(dirname "$0")/.."

convert assets/logo-ttb-frame-essence-bot.png -bordercolor white -border 0 \
      \( -clone 0 -resize 16x16 \) \
      \( -clone 0 -resize 32x32 \) \
      \( -clone 0 -resize 48x48 \) \
      \( -clone 0 -resize 64x64 \) \
      -delete 0 -alpha off -colors 256 dashboard/public/favicon.ico