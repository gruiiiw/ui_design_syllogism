from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)






# ROUTES

@app.route('/')
def homepage():
   return render_template('homepage.html')