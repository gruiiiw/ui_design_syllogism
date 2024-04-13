from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)



# ROUTES

@app.route('/')
def homepage():
   return render_template('homepage.html')

# Lesson Pages

@app.route('/lesson/page1')
def lesson_page1():
   return render_template('lesson_page1.html')






if __name__ == '__main__':
   app.run(debug = True)
