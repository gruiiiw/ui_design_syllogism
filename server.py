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
      "next":"/quiz/2",
      "prev":"/quiz/1"
   },

   "5":{
      "lesson_id": "5",
      "title": "Building The Syllogism",
      "text": "Now that we know how propositions work, \n let’s put them together into syllogistic form:",
      "next":"/quiz/3",
      "prev":"/quiz/2"
   },
   
   "6":{
      "lesson_id": "5",
      "title": "Logical Fallacies",
      "text": "Make sure to not accidentally affirm the consequent: or deny the antecedent:",
      "next":"/quiz/4",
      "prev":"/quiz/3"
   },
}

quizzes = {
   "1":{
      "quiz_id": "1",
      "title": "Building Block 1: Terms",
      "text": "Exercise: Drag the following terms into their respective categories",
      "next":"/learn/4",
      "prev":"/learn/3"
   },

   "2":{
      "quiz_id": "2",
      "title": "Building Block 2: Propositions",
      "text": "Create three propositions using the terms and copula provided below",
      "next":"/learn/5",
      "prev":"/learn/3"
   },

   "3":{
      "quiz_id": "3",
      "title": "Building the Syllogism",
      "text": "Build two valid syllogisms using the propositions below. \n Make the first syllogism sound and the second syllogism unsound",
      "next":"/learn/6",
      "prev":"/learn/4"
   },

   "4":{
      "quiz_id": "4",
      "title": "Logical Fallacies",
      "text": "Classify the statements below:",
      "next":"/quiz/5",
      "prev":"/learn/5"
   },
   "5":{
      "quiz_id": "5",
      "title": "Putting it all together",
      "text": "",
      "next":"/",
      "prev":"/learn/5"
   }

}

# ROUTES
@app.route('/')
def homepage():
   return render_template('homepage.html', current_page='homepage')

# Lesson Pages
@app.route('/learn/<lesson_id>')
def learn(lesson_id):
   lesson = lessons[lesson_id]
   return render_template('learn.html', lesson=lesson, current_page='learn' + lesson_id)


# Quiz Pages - We need to have something to store the score
@app.route('/quiz/<quiz_id>')
def quiz(quiz_id):
   quiz = quizzes[quiz_id]
   return render_template('quiz.html', quiz=quiz, current_page='quiz' + quiz_id)


if __name__ == '__main__':
   app.run(debug = True)
