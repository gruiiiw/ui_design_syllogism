from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)





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
