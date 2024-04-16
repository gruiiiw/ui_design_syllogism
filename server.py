from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


lessons = {
   "1":{
      "lesson_id": "1",
      "title": "What is a Syllogism",
      "text": "",
      "next_lesson":"2"
   },

   "2":{
      "lesson_id": "2",
      "title": "What is a Syllogism",
      "text": "",
      "next_lesson":"2"
   },
   
   "3":{
      "lesson_id": "3",
      "title": "Building Block 1: Terms",
      "text": "",
      "next_lesson":"2"
   },

   "4":{
      "lesson_id": "3",
      "title": "Building Block 2: Propositions",
      "text": "",
      "next_lesson":"2"
   },

   "5":{
      "lesson_id": "3",
      "title": "Building Block 2: Propositions",
      "text": "",
      "next_lesson":"2"
   },
   
   "6":{
      "lesson_id": "3",
      "title": "Building Block 2: Propositions",
      "text": "",
      "next_lesson":"2"
   }
}


# ROUTES

@app.route('/')
def homepage():
   return render_template('homepage.html')

# Lesson Pages

@app.route('/learn/<lesson_id>')
def learn(lesson_id):
   lesson = lessons[lesson_id]
   return render_template('learn.html', lesson=lesson)


# Quiz Pages - We need to have something to store the score




if __name__ == '__main__':
   app.run(debug = True)
