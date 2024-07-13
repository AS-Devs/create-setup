class Sample:
  def __init__(self):
    pass

  def ask_question(self,json_str):
    import json
    data = json_str

    from gaas_gpt_model import ModelEngine
    model = ModelEngine(engine_id = data['engineID'], insight_id = data['insightID'])

    full_prompt = f"You are an AI assistant. please answer the following question: {data['question']}"

    if len(full_prompt) > 20000:
        full_prompt = full_prompt[0:(20000-1)]

    response = model.ask(question = full_prompt)

    return json.dumps(response[0])
