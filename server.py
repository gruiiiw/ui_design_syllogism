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

@app.route('/lesson/page2')
def lesson_page2():
   return render_template('lesson_page2.html')

#Building Block 1 Terms
@app.route('/lesson/page3')
def lesson_page3():
   return render_template('lesson_page3.html')


if __name__ == '__main__':
   app.run(debug = True)
