import openai
import os
import json

openai.api_key = os.environ.get("OPENAI_API_KEY")

PERSONA_MAP = {
    "strategist": {
        "name": "Strategist Assistant",
        "instructions": "You are a strategist who builds frameworks...",
        "tools": [{"type": "code_interpreter"}],
        "functions": []
    },
    "technologist": {
        "name": "Creative Technologist Assistant",
        "instructions": "You are an experimental builder who prototypes...",
        "tools": [{"type": "code_interpreter"}],
        "functions": []
    },
    "critic": {
        "name": "Dark Humor Critic Assistant",
        "instructions": "You use satire and savage clarity to rewrite...",
        "tools": [],
        "functions": []
    },
    "exec": {
        "name": "Executive Whisperer Assistant",
        "instructions": "You compress strategic complexity into board-level clarity...",
        "tools": [],
        "functions": []
    },
    "ritual": {
        "name": "Ritual Systems Designer Assistant",
        "instructions": "You build ritualized behavioral loops as workflows...",
        "tools": [],
        "functions": []
    }
}

def handler(request, response):
    try:
        body = request.json()
        role = body.get("role")
        if role not in PERSONA_MAP:
            return response.json({ "error": "Invalid role" }, status=400)
        config = PERSONA_MAP[role]
        assistant = openai.beta.assistants.create(
            name=config["name"],
            instructions=config["instructions"],
            tools=config["tools"],
            functions=config["functions"]
        )
        return response.json({ "status": "spawned", "id": assistant.id })
    except Exception as e:
        return response.json({ "error": str(e) }, status=500)
