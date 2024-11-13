# Threat Sentry

Threat Sentry is a cybersecurity incident response testing tool that utilizes large language models in conjunction with the MITRE ATT&CK framework. It generates customized incident response scenarios based on selected threat actor groups and the specific details of your organization.

## Features

- Generates tailored incident response scenarios based on selected threat actor groups and your organization's details.
- Supports both Enterprise and ICS MITRE ATT&CK matrices.
- Includes scenario templates for quickly generating common cyber incident types.
- Features a chat interface (Threat Sentry Assistant) for scenario updates and queries.
- Allows feedback capture on scenario quality.
- Provides downloadable scenarios in Markdown format.
- Threat Sentry Assistant - a chat interface for updating and/or asking questions about generated scenarios.
- Utilizes multiple APIs (OpenAI, Azure, Google AI, Mistral, Ollama) for generating scenarios.
- Available as a Docker container image for easy deployment.
- Optional integration with [LangSmith](https://docs.smith.langchain.com/) for powerful debugging, testing, and monitoring of model performance.
- Secure credential management using .env file for API keys and secrets.

## Requirements

- Recent version of Python.
- Python packages: pandas, streamlit, and any other packages necessary for the custom libraries (`langchain` and `mitreattack`).
- Gemini API key (or API key for your chosen model provider).
- LangChain API key (optional) - see [LangSmith Setup](#langsmith-setup) section below for further details.
- Data files: `enterprise-attack.json` and `ics-attack.json` (MITRE ATT&CK datasets in STIX format), and `groups.json`.
- `.env` file for storing API keys and secrets (see [Installation](#installation) section for details).

## LangSmith Setup

If you would like to use LangSmith for debugging, testing, and monitoring of model performance, you will need to set up a LangSmith account and create a `.streamlit/secrets.toml` file that contains your LangChain API key. Please follow the instructions [here](https://docs.smith.langchain.com/) to set up your account and obtain your API key. You'll find a `secrets.toml-example` file in the `.streamlit/` directory that you can use as a template for your own secrets.toml file.

If you do not wish to use LangSmith, you must still have a `.streamlit/secrets.toml` file in place, but you can leave the `LANGCHAIN_API_KEY` field empty.

## Data Setup

Download the latest version of the MITRE ATT&CK dataset in STIX format from [here](https://github.com/mitre-attack/attack-stix-data/blob/master/enterprise-attack/enterprise-attack.json). Ensure to place this file in the `./data/` directory within the repository.

## Running Threat Sentry

After the data setup, you can run Threat Sentry with the following command:

```
python -m streamlit run welcome.py
```

### Generating Scenarios

#### Standard Scenario Generation
1. Choose whether to use the OpenAI API or the Azure OpenAI Service.
2. Enter your OpenAI API key, or the API key and deployment details for your model on the Azure OpenAI Service.
3. Select your organisatin's industry and size from the dropdown menus.
4. Navigate to the `Threat Group Scenarios` page.
5. Select the Threat Actor Group that you want to simulate.
6. Click on 'Generate Scenario' to create the incident response scenario.
7. Use the 👍 or 👎 buttons to provide feedback on the quality of the generated scenario. N.B. The feedback buttons only appear if a value for LANGCHAIN_API_KEY has been set in the `.streamlit/secrets.toml` file.

#### Custom Scenario Generation
1. Choose whether to use the OpenAI API or the Azure OpenAI Service.
2. Enter your OpenAI API Key, or the API key and deployment details for your model on the Azure OpenAI Service.
3. Select your organisation's industry and size from the dropdown menus.
4. Navigate to the `Custom Scenario` page.
5. Use the multi-select box to search for and select the ATT&CK techniques relevant to your scenario.
6. Click 'Generate Scenario' to create your custom incident response testing scenario based on the selected techniques.
7. Use the 👍 or 👎 buttons to provide feedback on the quality of the generated scenario. N.B. The feedback buttons only appear if a value for LANGCHAIN_API_KEY has been set in the `.streamlit/secrets.toml` file.

Please note that generating scenarios may take a minute or so. Once the scenario is generated, you can view it on the app and also download it as a Markdown file.
