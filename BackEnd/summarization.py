import openai
import os

#this is one option for creating a one-paragraph summary
#transcript here must be a string
def create_paragraph_summary(transcript):
    openai.api_key = os.environ['GPT3_KEY']
    response = openai.Completion.create(engine="davinci", 
        prompt= transcript + "\ntl;dr:", 
        max_tokens=64,
        temperature= .7,
        top_p= 1,
        n= 1,
        stream= False,
        stop= "\n"
    )
    return response
    
