---
title: GPT Actions Deprecation Alternatives
source: https://chatgpt.com/c/686c1138-391c-8003-b792-977cb18de248
---

# GPT Actions Deprecation Alternatives

#### You:
<time datetime="2025-07-07T18:25:59.421Z" title="7/7/2025, 1:25:59 PM">13:25</time>

https://openai.com/index/computer-using-agent/ Browser base custom gpt action schema

#### ChatGPT:
<time datetime="2025-07-07T18:26:01.092Z" title="7/7/2025, 1:26:01 PM">13:26</time>

OpenAI's GPT Actions, which enabled Custom GPTs to interact with external APIs via OpenAPI schemas, were deprecated in early 2024. This feature allowed developers to define API endpoints, parameters, and authentication methods, enabling GPTs to perform tasks like data retrieval and workflow automation. However, due to complexities in setup and maintenance, OpenAI has shifted focus to more robust solutions like function calling and the Assistants API citeturn0search4.

### Understanding GPT Actions

GPT Actions allowed Custom GPTs to make API calls by importing OpenAPI schemas (versions 3.0 or 3.1). Developers could specify endpoints, request/response structures, and authentication details, enabling GPTs to perform actions such as fetching data or triggering workflows citeturn0search5.

### Alternatives Post-Deprecation

With the deprecation of GPT Actions, developers have several alternatives:

- **Function Calling**: OpenAI's function calling feature allows GPTs to call functions defined by developers, facilitating structured outputs and integrations.

- **Assistants API**: This API provides tools for building AI assistants with persistent memory and the ability to call functions, offering a more comprehensive solution for complex tasks.

- **Third-Party Platforms**: Platforms like Lindy offer AI agents capable of multi-step workflows, memory retention, and integrations with tools like Gmail, Slack, and Salesforce citeturn0search4.

### Resources for Building Custom Integrations

For developers interested in building custom integrations:

- **OpenAI Cookbook**: Provides examples and guides for integrating GPTs with various APIs and services citeturn0search2.

- **Community Repositories**: GitHub repositories like [bapo2/gpt-actions](https://github.com/bapo2/gpt-actions) offer a collection of action schemas that can serve as references.

If you need assistance transitioning from GPT Actions to these alternatives or have specific integration requirements, feel free to ask.


#### You:
<time datetime="2025-07-07T18:26:26.467Z" title="7/7/2025, 1:26:26 PM">13:26</time>

Now apply to my case use great thanks 

#### ChatGPT:
<time datetime="2025-07-07T18:26:28.176Z" title="7/7/2025, 1:26:28 PM">13:26</time>

Alright Helen, let's cut through the noise and get you back on track.

### 🧨 The Brutal Truth

\*\*GPT Actions are dead.\*\* OpenAI pulled the plug in early 2024. No more browser-based OpenAPI schema uploads. No more plug-and-play integrations. No more magic. If you're still trying to revive that corpse, you're wasting your time.

### 🧠 The New Reality: Function Calling via Assistants API

OpenAI has shifted gears. Now, it's all about **Function Calling** through the **Assistants API**. This means you define your functions, and the model decides when to call them. It's more flexible but requires more setup.

### 🛠️ Your Action Plan

1. **Define Your Functions**: Create JSON schemas for the functions you want the model to call.

2. **Set Up the Assistants API**: Use the Assistants API to register your functions and manage conversations.

3. **Handle Function Calls**: When the model decides to call a function, it will return the function name and arguments. Your code needs to execute the function and return the result to the model.

4. **Manage Conversations**: Use threads to maintain conversation history and context.

### 🧪 Example: Weather Assistant

Here's a simplified example of a weather assistant using the Assistants API:

```python
import openai
import requests

openai.api_key = 'your-api-key'

# Define the function schema
functions = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and country, e.g., Paris, France"
                }
            },
            "required": ["location"]
        }
    }
]

# Define the function implementation
def get_weather(location):
    # Replace with your actual weather API call
    return f"The weather in {location} is sunny."

# Create an assistant
assistant = openai.beta.assistants.create(
    instructions="You are a weather assistant.",
    model="gpt-4",
    tools=[{"type": "function", "function": functions[0]}]
)

# Create a thread
thread = openai.beta.threads.create()

# Add a message to the thread
openai.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="What's the weather in Paris?"
)

# Run the assistant
run = openai.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=assistant.id
)

# Poll for the run status
while True:
    run_status = openai.beta.threads.runs.retrieve(
        thread_id=thread.id,
        run_id=run.id
    )
    if run_status.status == "completed":
        break
    elif run_status.status == "requires_action":
        tool_calls = run_status.required_action.submit_tool_outputs.tool_calls
        for call in tool_calls:
            if call.function.name == "get_weather":
                location = call.function.arguments["location"]
                weather = get_weather(location)
                openai.beta.threads.runs.submit_tool_outputs(
                    thread_id=thread.id,
                    run_id=run.id,
                    tool_outputs=[{
                        "tool_call_id": call.id,
                        "output": weather
                    }]
                )
    else:
        time.sleep(1)

# Retrieve the assistant's response
messages = openai.beta.threads.messages.list(thread_id=thread.id)
for message in messages.data:
    print(f"{message.role}: {message.content}")
```

### 🧱 Resources

- [Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [Assistants API Overview](https://platform.openai.com/docs/assistants/overview)
- [Function Calling with OpenAPI Spec](https://cookbook.openai.com/examples/function_calling_with_an_openapi_spec)

### 🚀 Next Steps

If you're ready to move forward, start by defining your function schemas and setting up the Assistants API. If you need help with specific parts of the process, let me know, and we can tackle them together.

Let's get this done.


#### You:
<time datetime="2025-07-07T18:54:45.007Z" title="7/7/2025, 1:54:45 PM">13:54</time>

let's do it 

#### ChatGPT:
<time datetime="2025-07-07T18:54:45.911Z" title="7/7/2025, 1:54:45 PM">13:54</time>

Fantastic, Helen. Let's roll up our sleeves and get this Function Calling setup operational. Here's the streamlined plan:

---

### 🛠️ Step 1: Define Your Function

We'll start by defining the function that the assistant can call. For example, a `get_weather` function that retrieves weather information for a given location.

```python
functions = [
    {
        "name": "get_weather",
        "description": "Retrieve current weather information for a specified location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and country, e.g., Paris, France"
                }
            },
            "required": ["location"]
        }
    }
]
```

---

### 🔧 Step 2: Implement the Function

Next, implement the actual function logic. This function will be called when the assistant determines it's appropriate.

```python
import requests

def get_weather(location):
    # Replace with your actual weather API endpoint and API key
    api_key = "your_api_key"
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": location, "appid": api_key, "units": "metric"}
    response = requests.get(base_url, params=params)
    data = response.json()
    weather = data["weather"][0]["description"]
    temperature = data["main"]["temp"]
    return f"The weather in {location} is {weather} with a temperature of {temperature}°C."
```

---

### 🧠 Step 3: Create the Assistant

Using the OpenAI Assistants API, create an assistant and register the function.

```python
import openai

openai.api_key = "your_openai_api_key"

assistant = openai.beta.assistants.create(
    instructions="You are a helpful assistant that provides weather information.",
    model="gpt-4",
    tools=[{"type": "function", "function": functions[0]}]
)
```

---

### 🧵 Step 4: Start a Conversation Thread

Create a thread to manage the conversation context.

```python
thread = openai.beta.threads.create()
```

---

### 💬 Step 5: Add a User Message

Add a message from the user to the thread.

```python
openai.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="What's the weather in Paris?"
)
```

---

### 🚀 Step 6: Run the Assistant

Execute the assistant to process the message and determine if a function call is needed.

```python
run = openai.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=assistant.id
)
```

---

### 🔄 Step 7: Handle Function Calls

If the assistant decides to call a function, handle the function call and provide the output back to the assistant.

```python
import time

while True:
    run_status = openai.beta.threads.runs.retrieve(
        thread_id=thread.id,
        run_id=run.id
    )
    if run_status.status == "completed":
        break
    elif run_status.status == "requires_action":
        tool_calls = run_status.required_action.submit_tool_outputs.tool_calls
        for call in tool_calls:
            if call.function.name == "get_weather":
                location = call.function.arguments["location"]
                weather_info = get_weather(location)
                openai.beta.threads.runs.submit_tool_outputs(
                    thread_id=thread.id,
                    run_id=run.id,
                    tool_outputs=[{
                        "tool_call_id": call.id,
                        "output": weather_info
                    }]
                )
    else:
        time.sleep(1)
```

---

### 📩 Step 8: Retrieve the Assistant's Response

Finally, retrieve the assistant's response after processing the function output.

```python
messages = openai.beta.threads.messages.list(thread_id=thread.id)
for message in messages.data:
    print(f"{message.role}: {message.content}")
```

---

This setup allows the assistant to process user inputs, determine when to call external functions, execute them, and provide the results back to the user seamlessly.

If you need further assistance or have specific requirements, feel free to ask!


#### You:
<time datetime="2025-07-07T18:56:42.001Z" title="7/7/2025, 1:56:42 PM">13:56</time>



#### Plugin (file_search):
<time datetime="2025-07-07T18:56:54.482Z" title="7/7/2025, 1:56:54 PM">13:56</time>

Make sure to include `【message_idx†source】` markers to provide citations based on this file, where [message_idx] is provided at the beginning of this message
{
  "summon-lore": {
    "function": "summon_lore",
    "parameters": {
      "archetype": "string"
    }
  },
  "trigger-banishment": {
    "function": "trigger_banishment",
    "parameters": {
      "entity_id": "string",
      "dimension": "string"
    }
  }
}

#### ChatGPT:
<time datetime="2025-07-07T18:56:42.722Z" title="7/7/2025, 1:56:42 PM">13:56</time>

Perfect. You dropped in `triggerMap.json`, and I see you’ve got a classic function mapping setup designed for an agent or assistant interface to call `summon_lore` and `trigger_banishment`. Let’s weaponize this into a fully operational **Function Calling Assistant** using the OpenAI Assistants API.

---

## 🧩 Step-by-Step: Translate `triggerMap.json` into Assistant Function Calls

### ✅ 1. **Parse Your Schema**

You’ve defined two callable functions:

#### a. `summon_lore`

```json
{
  "function": "summon_lore",
  "parameters": {
    "archetype": "string"
  }
}
```

#### b. `trigger_banishment`

```json
{
  "function": "trigger_banishment",
  "parameters": {
    "entity_id": "string",
    "dimension": "string"
  }
}
```

---

### 🧠 2. **Define These for the Assistants API**

Here’s how we translate them into Python for OpenAI:

```python
functions = [
    {
        "name": "summon_lore",
        "description": "Summons lore details for a specific archetype.",
        "parameters": {
            "type": "object",
            "properties": {
                "archetype": {
                    "type": "string",
                    "description": "The archetype to summon lore for, e.g., 'Trickster', 'Rebel', 'Oracle'"
                }
            },
            "required": ["archetype"]
        }
    },
    {
        "name": "trigger_banishment",
        "description": "Banishes an entity from the known world into a specified dimension.",
        "parameters": {
            "type": "object",
            "properties": {
                "entity_id": {
                    "type": "string",
                    "description": "Unique identifier for the entity to be banished"
                },
                "dimension": {
                    "type": "string",
                    "description": "Target dimension, e.g., 'Shadow Realm', 'Null Zone'"
                }
            },
            "required": ["entity_id", "dimension"]
        }
    }
]
```

---

### 🛠 3. **Implement Function Logic**

Stub logic for now—customize later:

```python
def summon_lore(archetype):
    return f"Lore for the {archetype}: A legendary figure with unmatched chaotic energy."

def trigger_banishment(entity_id, dimension):
    return f"Entity {entity_id} has been banished to {dimension}. Good riddance."
```

---

### 🤖 4. **Register Assistant**

```python
assistant = openai.beta.assistants.create(
    instructions="You are a chaotic lore-bending assistant that answers or acts upon fantasy requests.",
    model="gpt-4",
    tools=[{"type": "function", "function": f} for f in functions]
)
```

---

### 🔁 5. **Full Execution Loop**

Same execution as before — we’ll poll the thread, intercept function calls, run them, and pass the output back.

If you want, I’ll drop this into a **runnable FastAPI or Flask** app, or script it out CLI-style. Just tell me:

- Do you want this headless (API only), or with a web interface?
- Want me to auto-generate examples like `summon_lore("Oracle")` and handle funky archetypes?

---

## ⏭️ Next Move?

Pick a path:

1. **"Script It"** — I’ll drop a standalone file you can run to test locally.
2. **"Build the Flask/FastAPI server"** — You’ll get a real endpoint you can hit.
3. **"Go Full Stack"** — Want buttons + interface? We’ll drop it into React/TS too.
4. **"Deploy This"** — I’ll Dockerize and give you a deployment script.

You call it.
