#!/bin/bash
# Check for pending tasks from Telegram bot
# Run via cron every 5 minutes

TASKS_DIR="/root/.openclaw/dental-agent/tasks"
SERVER="root@144.91.109.79"

# Get pending tasks
TASKS=$(ssh -o ConnectTimeout=5 $SERVER "ls $TASKS_DIR/*.json 2>/dev/null" 2>/dev/null)

if [ -n "$TASKS" ]; then
    COUNT=$(echo "$TASKS" | wc -l | tr -d ' ')
    # Show notification on Mac
    osascript -e "display notification \"$COUNT pending task(s) from Telegram bot\" with title \"DentalWebAI\" sound name \"Glass\""
    
    # Print tasks
    for f in $TASKS; do
        ssh -o ConnectTimeout=5 $SERVER "cat $f" 2>/dev/null
        echo "---"
    done
fi
