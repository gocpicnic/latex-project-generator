#!/bin/zsh

find . -type f -name "*.aux" -o -name "*.pdf" -o -name "*.gz" -o -name "*.bbl" -o -name "*.blg" -o -name "*.log" -o -name "*.out"  | xargs rm -f


