from flask import Flask
from flask import render_template
from flask import Response, request, jsonify


app = Flask(__name__)


quizzes = {
   "1":{
      "quiz_id": "1",
      "title": "Building Block 1: Terms",
      "text": "Exercise: Drag the following terms into their respective categories",
      "my_blurbs": ["Oregon", "That Horse over There", "speaks", "The Rocky Mountain State", "Secretarian", "speak", "Utah"],
      "my_squares": ["US States", "Horses", "Speaking Things"],
      "correct_answers": {"US States": ["Oregon", "Utah", "The Rocky Mountain State"], "Horses": ["That Horse over There", "Secretarian"], "Speaking Things": ["speaks", "speak"] },
      "next_lesson":"/learn/4",
      "prev_lesson":"/learn/3"
   },

   "2":{
      "quiz_id": "2",
      "title": "Building Block 2: Propositions",
      "text": "Create three propositions using the terms and copua provided below",
      "my_blurbs": ["a man", "is", "Aristotle", "lectures", "The professor", "I", "Hungry", "am", "hungry"],
      "my_squares": ["1", "2", "3"],
      "correct_answers": {"1": ["Aristotle", "is", "a man"], "2": ["The professor", "lectures"], "3": ["I", "am", "hungry"] },
      "next_lesson":"/learn/5",
      "prev_lesson":"/learn/4"
   },

    "3":{
      "quiz_id": "3",
      "title": "Building The Syllogism",
      "text": "Build two valid syllogisms using the propositions below. Make the first syllogism",
      "my_blurbs": ["a man", "is", "Aristotle", "lectures", "The professor", "I", "Hungry", "am", "hungry"],
      "my_squares": ["1", "2", "3"],
      "correct_answers": {"1": ["Aristotle", "is", "a man"], "2": ["The professor", "lectures"], "3": ["I", "am", "hungry"] },
      "next_lesson":"/learn/4",
      "prev_lesson":"/learn/5"
   }

}


lessons = {
   "1":{
      "lesson_id": "1",
      "title": "What is a Syllogism",
      "text": "Syllogisms: a syllogism is a specific form of argument through which we infer a conclusion on the basis of two premises;\n\nSyllogisms are central to logic, which is the study of correct patterns of reasoning. Logic is all about argument and persuasion.\n\nTo understand syllogisms, we need to understand their parts",
      "next_lesson":"/learn/2",
      "prev_lesson":"/"
   },

   "2":{
      "lesson_id": "2",
      "title": "What is a Syllogism",
      "text": """Here is a more precise definition of a syllogism:
      Syllogisms: a syllogism is a specific form of argument
      through which we infer a conclusion on the basis of
      two premises, each of which is a proposition.
      Syllogisms are distinguished by the fact that the two
      premises have exactly one term in common. """,
      "next_lesson":"/learn/3",
      "prev_lesson":"/learn/1"
   },
   
   "3":{
      "lesson_id": "3",
      "title": "Building Block 1: Terms",
      "text": "Our syllogism definition involved terms and propositions. \n For now, let's look at terms.\n\nTerms: man, ox, runs, wins, yellow, that funny comedian, the book on that shelf, etc.\n\nA term is either a noun, adjective, or verb, and it refers to a category of things.",
      "next_lesson":"/quiz/1",
      "prev_lesson":"/learn/2"
   },

   "4":{
      "lesson_id": "4",
      "title": "Building Block 2: Propositions",
      "text": """A proposition involves connecting two terms,
      a subject and a predicate , sometimes using
      a copula, or a connector, such as “is,” “are”,
      “was”, or “were.”

      Propositions take the form of a declarative
      sentence and can always be true or false

      Example:

      “I am hungry. ” is a proposition;

      “Feed me!” is not.""",
      "next_lesson":"/quiz/2",
      "prev_lesson":"/quiz/1"
   },

   "5":{
      "lesson_id": "5",
      "title": "Building Block 2: Propositions",
      "text": "",
      "next_lesson":"2",
      "prev_lesson":""

   },
   
   "6":{
      "lesson_id": "6",
      "title": "Building Block 2: Propositions",
      "text": "Now that we know how propositions work, let’s put them together into syllogistic form:",
      "next_lesson":"2",
      "prev_lesson":"",
      "images":["diagram_1.png", "diagram_2.png"]

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

# Lesson Pages

@app.route('/quiz/<quiz_id>')
def quiz(quiz_id):
   quiz = quizzes[quiz_id]
   return render_template('quiz.html', quiz=quiz)



# Other
@app.template_filter('contains_any')
def contains_any(word, terms):
    return any(term in word for term in terms)


if __name__ == '__main__':
   app.run(debug = True)
