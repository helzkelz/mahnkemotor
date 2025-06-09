[![Deploy to Vercel](https://github.com/your-org/HelenCore_Repo/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-org/HelenCore_Repo/actions/workflows/deploy.yml)

# 🧠 HelenCore Assistant System

This repository contains the full GodMode deployment architecture for spawning and operating modular AI assistants using OpenAI's Assistants API.

## 🔥 Features

- Assistant auto-spawning via role intent
- GUI dashboard interface
- Secure backend via Vercel API route
- SVG-based assistant hierarchy map
- Full assistant persona configs & JSONs
- NotebookLM-compatible memory dump
- Vector upload ready

## 🚀 Quick Deploy

1. Set `OPENAI_API_KEY` in your Vercel project settings.
2. Deploy via Vercel or manually clone and host.

## 📁 Structure

- `api/spawn.py` — backend endpoint for assistant creation
- `public/` — static dashboard and SVG UI
- `docs/` — assistant instruction sets and config files
- `vercel.json` — routing config
