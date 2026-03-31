#!/bin/sh
# Husky shell helper (copied from Husky's default template)
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $*"
  }
  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."
  if [ -z "$HUSKY" ]; then
    echo "Can't run $hook_name: HUSKY env variable not set. Did you install Husky?"
    exit 1
  fi
fi
