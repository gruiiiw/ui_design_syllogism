from flask import Flask
from flask import render_template
from markupsafe import Markup
from flask import Response, request, jsonify


app = Flask(__name__)



lessons = {
   "1":{
      "lesson_id": "1",
      "title": "What is a Syllogism?",
      "text": "Syllogisms: a syllogism is a specific form of argument through which we infer a conclusion on the basis of two premises;",
      "text1_1": "\nSyllogisms are central to logic, which is the study of correct patterns of reasoning.",
      "next_lesson":"/learn/2",
      "prev_lesson":"/", 
   },

   "2":{
      "lesson_id": "2",
      "title": "What is a Syllogism?",
      "text": """Syllogisms:  a specific form of argument through which we infer a conclusion on the basis of two premises, \n each of which is a proposition.
 \n Syllogisms are distinguished by the fact that the two premises have exactly one term in common.""",
      "next_lesson":"/learn/2.5",
      "prev_lesson":"/learn/1",
   },

   
   "2.5":{
      "lesson_id": "2.5",
      "title": "What is a Syllogism?",
      "text": "Can you start to see these parts in the following examples?",
      "next_lesson":"/learn/3",
      "prev_lesson":"/learn/2",
   },
   
   "3":{
      "lesson_id": "3",
      "title": "Building Block 1: Terms",
      "text": "Syllogism definition involved terms and propositions. For now, let's look at terms. ",
      "text2_1":"""A term is either a noun, adjective, or verb, and it refers to a category of things. """,

      "next_lesson":"/quiz/1",
      "prev_lesson":"/learn/2.5",

   },

   "4":{
      "lesson_id": "4",
      "title": "Building Block 2: Propositions",
      "next_lesson":"/quiz/2",
      "prev_lesson":"/quiz/1"
   },

   "5":{
      "lesson_id": "5",
      "title": "Building the Syllogism",
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
      "title": "Logical Fallacies",
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

quizzes = {
   "1": {
        "quiz_id": "1",
        "title": "Building Block 1: Terms",
        "text": "Exercise: Drag the following terms into their respective categories",
        "next": "/learn/4",
        "prev": "/learn/3",
        "categories": [
            {"id": "us-states", "name": "US States"},
            {"id": "horses", "name": "Horses"},
            {"id": "speaking-things", "name": "Speaking Things"}
        ],
        "items": [
            {"id": "oregon", "name": "Oregon", "category": "us-states"},
            {"id": "horse-over-there", "name": "that horse over there", "category": "horses"},
            {"id": "speaks", "name": "speaks", "category": "speaking-things"},
            {"id": "rocky-mountain", "name": "The Rocky Mountain State", "category": "us-states"},
            {"id": "secretariat", "name": "Secretariat", "category": "horses"},
            {"id": "speak", "name": "speak", "category": "speaking-things"},
            {"id": "utah", "name": "Utah", "category": "us-states"}
        ]
    },
    "2": {
        "quiz_id": "2",
        "title": "Building Block 2: Propositions",
        "text": "Create three propositions using the terms and copula provided below",
        "next": "/learn/5",
        "prev": "/learn/4",
        "categories": [
            {"id": "zone1", "name": "Zone 1"},
            {"id": "zone2", "name": "Zone 2"},
            {"id": "zone3", "name": "Zone 3"}
        ],
        "items": [
            {"id": "aristotle", "name": "Aristotle", "category": "prop1"},
            {"id": "is", "name": "is", "category": "prop1"},
            {"id": "a-man", "name": "a man", "category": "prop1"},
            {"id": "the-professor", "name": "The professor", "category": "prop2"},
            {"id": "lectures", "name": "lectures", "category": "prop2"},
            {"id": "i", "name": "I", "category": "prop3"},
            {"id": "am", "name": "am", "category": "prop3"},
            {"id": "hungry", "name": "hungry", "category": "prop3"}
        ]
    },

   "3":{
      "quiz_id": "3",
      "title": "Building the Syllogism",
      "text": "Build two valid syllogisms using the propositions below. \n Make the first syllogism sound and the second syllogism unsound",
      "next":"/learn/6",
      "prev":"/learn/5",
      "categories": [
            {"id": "z11", "name": "P1"},
            {"id": "z12", "name": "P1"},
            {"id": "z21", "name": "P2"},
            {"id": "z22", "name": "P2"},
            {"id": "z31", "name": "C"},
            {"id": "z32", "name": "C"}
        ],
        "items": [
            {"id": "p1_1", "name": "All mammals are animals", "category": "prop11"},
            {"id": "p1_2", "name": "All professors teach math", "category": "prop12"},
            {"id": "p2_2", "name": "Beyonce is a professor", "category": "prop21"},
            {"id": "p2_1", "name": "that horse is a mammal", "category": "prop22"},
            {"id": "c_1", "name": "that horse is an animal", "category": "prop31"},
            {"id": "c_2", "name": "Beyonce teaches math", "category": "prop32"},
        ]
   },

   "4":{
      "quiz_id": "4",
      "title": "Logical Fallacies",
      "text": "Classify the statements below:",
      "next":"/quiz/5",
      "prev":"/learn/6",
      "categories": [
            {"id": "box1", "name": "Valid Syllogism"},
            {"id": "box2", "name": "Affirming the consequent"},
            {"id": "box3", "name": "Denying the antecedent"},
        ],
        "items": [
            {"id": "b3", "name": "(1) All universities have students \n(2) No high schools are universities \n(3) Therefore, no high schools have students", "category": "b_3"},
            {"id": "b1", "name": "(1) All horses are mammals \n(2) All mammals are animals \n(3) Therefore, all horses are animals", "category": "b_1"},
            {"id": "b2", "name": "(1) All dogs are animals \n(2) Aristotle is an animal \n(3) Therefore, Aristotle is a dog.", "category": "b_2"},
        ]
   },
   "5":{
      "quiz_id": "5",
      "title": "Putting it all together",
      "text": "",
      "next":"/",
      "prev":"/quiz/4",
      "categories": [
            {"id": "v1", "name": "(1)"},
            {"id": "v2", "name": "(2)"},
            {"id": "v3", "name": "(3) Therefore, "},
            {"id": "f1", "name": "(1)"},
            {"id": "f2", "name": "(2)"},
            {"id": "f3", "name": "(3) Therefore, "},
        ],
        "items": [
            {"id": "prompt1", "name": "reptiles", "category": "pt1"},
            {"id": "prompt2", "name": "a snake", "category": "pt2"},
            {"id": "prompt3", "name": "Mikey", "category": "pt3"},
            {"id": "prompt4", "name": "a reptile", "category": "pt4"},
            {"id": "prompt5", "name": "All snakes", "category": "pt5"},
            {"id": "prompt6", "name": "are", "category": "pt6"},
            {"id": "prompt7", "name": "is", "category": "pt7"},
        ]
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

@app.route('/quiz/page1')
def quiz_page1():
   return render_template('quiz_page1.html')

@app.route('/quiz/page2')
def quiz_page2():
   return render_template('quiz_page2.html')

@app.route('/quiz/page3')
def quiz_page3():
   return render_template('quiz_page3.html')

@app.route('/quiz/page4')
def quiz_page4():
   return render_template('quiz_page4.html')

# Quiz Pages - We need to have something to store the score
@app.route('/quiz/<quiz_id>')
def quiz(quiz_id):
    quiz = quizzes.get(quiz_id)
    if quiz:
        # Make sure quiz['items'] is present and is a list
        if 'items' in quiz and isinstance(quiz['items'], list):
            for item in quiz['items']:
                item['name'] = Markup(item['name'].replace("\n", "<br>"))
            print("Quiz Data:", quiz)  # Confirm the structure
            return render_template('quiz.html', quiz=quiz, current_page='quiz' + quiz_id)
        else:
            return "Quiz data is malformed", 400
    else:
        return "Quiz not found", 404


# Other
@app.template_filter('contains_any')
def contains_any(word, terms):
    return any(term in word for term in terms)






if __name__ == '__main__':
   app.run(debug = True)
