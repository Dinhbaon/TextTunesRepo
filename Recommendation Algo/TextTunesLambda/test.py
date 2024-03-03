import json
import time
import requests
t0 = time.time()

url = 'https://pbbo1qd4je.execute-api.us-east-2.amazonaws.com/Prod/recommend/'
myobj = {"message": 'In today\'s dynamic job market, maintaining an up-to-date and organized resume is crucial. However, it can be a challenging task without the right tools. In this post, I\'ll share with you how I manage my resume with Git, Github Actions, Makefile, and branching strategies.'}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

x = requests.post(url, json = myobj, headers=headers)

print(x.json())
t1 = time.time()

print(t1-t0)