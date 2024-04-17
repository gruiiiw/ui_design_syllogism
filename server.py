from flask import Flask
from flask import render_template
from flask import Response, request, jsonify


app = Flask(__name__)



lessons = {
   "1":{
      "lesson_id": "1",
      "title": "What is a Syllogism",
      "text": "Syllogisms: a syllogism is a specific form of argument through which we infer a conclusion on the basis of two premises;\n\nSyllogisms are central to logic, which is the study of correct patterns of reasoning. Logic is all about argument and persuasion.\n\nTo understand syllogisms, we need to understand their parts",
      "next":"/learn/2",
      "prev":"/"
   },

   "2":{
      "lesson_id": "2",
      "title": "What is a Syllogism",
      "text": "",
      "next":"/learn/3",
      "prev":"/learn/1"
   },
   
   "3":{
      "lesson_id": "3",
      "title": "Building Block 1: Terms",
      "text": "Our syllogism definition involved terms and propositions. \n For now, let's look at terms.\n\nTerms: man, ox, runs, wins, yellow, that funny comedian, the book on that shelf, etc.\n\nA term is either a noun, adjective, or verb, and it refers to a category of things.",
      "next":"/quiz/1",
      "prev":"/learn/2"
   },

   "4":{
      "lesson_id": "4",
      "title": "Building Block 2: Propositions",
      "text": "",
      "next":"2",
      "prev":""
   },

   "5":{
      "lesson_id": "5",
      "title": "Building Block 2: Propositions",
      "text": "",
      "next":"2",
      "prev":""

   },
   
   "6":{
      "lesson_id": "6",
      "title": "Building Block 2: Propositions",
      "text": "",
      "next":"2",
      "prev":"",
      "image":"images\diagram_1.png"
      
   }
}

quizzes = {
   "1":{
      "quiz_id": "1",
      "title": "What is a Syllogism",
      "text": "Syllogisms: a syllogism is a specific form of argument through which we infer a conclusion on the basis of two premises;\n\nSyllogisms are central to logic, which is the study of correct patterns of reasoning. Logic is all about argument and persuasion.\n\nTo understand syllogisms, we need to understand their parts",
      "next":"/learn/2",
      "prev":"/"
   },

   "2":{
      "quiz_id": "1",
      "title": "What is a Syllogism",
      "text": "Syllogisms: a syllogism is a specific form of argument through which we infer a conclusion on the basis of two premises;\n\nSyllogisms are central to logic, which is the study of correct patterns of reasoning. Logic is all about argument and persuasion.\n\nTo understand syllogisms, we need to understand their parts",
      "next":"/learn/2",
      "prev":"/"
   },

   "3":{
      "quiz_id": "1",
      "title": "What is a Syllogism",
      "text": "Syllogisms: a syllogism is a specific form of argument through which we infer a conclusion on the basis of two premises;\n\nSyllogisms are central to logic, which is the study of correct patterns of reasoning. Logic is all about argument and persuasion.\n\nTo understand syllogisms, we need to understand their parts",
      "next":"/learn/2",
      "prev":"/"
   },

   "4":{
      "quiz_id": "1",
      "title": "What is a Syllogism",
      "text": "Syllogisms: a syllogism is a specific form of argument through which we infer a conclusion on the basis of two premises;\n\nSyllogisms are central to logic, which is the study of correct patterns of reasoning. Logic is all about argument and persuasion.\n\nTo understand syllogisms, we need to understand their parts",
      "next":"/learn/2",
      "prev":"/"
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
@app.route('/quiz/<lesson_id>')
def quiz(lesson_id):
   quiz = quizzes[lesson_id]
   return render_template('quiz.html', lesson=lesson)


if __name__ == '__main__':
   app.run(debug = True)
