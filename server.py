from flask import Flask
from flask import render_template
from flask import Response, request, jsonify


app = Flask(__name__)

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
      "text": """Here is a more precise definition of a syllogism:""",
      "text1":"""
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
      "text": "Our syllogism definition involved terms and propositions. For now, let's look at terms. ",
      "text1":"""Terms: man, ox, runs, wins, yellow, that funny comedian, the book on that shelf, etc.\n\nA term is either a noun, adjective, or verb, and it refers to a category of things. """,

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
      "title": "BUILDING THE SYLLOGISM",
      "text": "Now that we know how propositions work, let’s put them together into syllogistic form:",
      
      "list1": ["(1) All dogs are animals", "(2) Aristotle is an animal", "(3) Therefore, Aristotle is a dog."],
      "list2": ["(1) All universities have students", "(2) No high schools are universities", "(3) Therefore, no high schools have students"],


      "text3": "Notice how both of these are valid but only the first is sound",

      "next_lesson":"/quiz/3",
      "prev_lesson":"/quiz/2",
      
      "images":["images/diagram_1.png", "images/diagram_2.png"]
   },
   
   "6":{
      "lesson_id": "6",
      "title": "LOGICAL FALLACIES",
      "text": "",
      "text1": "Make sure to not accidentally affirm the consequent:",
      "list1": ["(1) All dogs are animals", "(2) Aristotle is an animal", "(3) Therefore, Aristotle is a dog."],

      "text2": "or deny the antecedent:",
      "list2": ["(1) All universities have students", "(2) No high schools are universities", "(3) Therefore, no high schools have students"],
      
      "next_lesson":"/quiz/4",
      "prev_lesson":"/quiz/3",
      "images":["images/diagram_3.png", "images/diagram_4.png"]
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
   return render_template('learn.html', lesson=lesson, current_page='learn' + lesson_id)

# Quiz Pages - We need to have something to store the score



# Other
@app.template_filter('contains_any')
def contains_any(word, terms):
    return any(term in word for term in terms)


if __name__ == '__main__':
   app.run(debug = True)
