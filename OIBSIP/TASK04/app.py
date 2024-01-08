from flask import Flask, render_template, request, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

users = {}
app = Flask(__name__, static_url_path='/static')

@app.route('/secured_page/<username>')
def secured_page(username):
    return render_template('secured_page.html', username=username)

@app.route('/')
def home():
    return render_template('index.html')
    

@app.route('/registration-success')
def registration_success():
    return render_template('registration_success.html')

@app.route('/register', methods=['POST'])
def register():
    try:
        username = request.form.get('username')
        password = request.form.get('password')

        if username in users:
            return jsonify({'error': 'Username already exists!'})

        hashed_password = generate_password_hash(password)
        users[username] = hashed_password

        return redirect(url_for('registration_success'))
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.form.get('username')
        password = request.form.get('password')

        if username not in users:
            return jsonify({'error': 'Username not found!'})

        hashed_password = users[username]

        if check_password_hash(hashed_password, password):
            return render_template('secured.html', username=username)
        else:
            return jsonify({'error': 'Incorrect password!'})
    except Exception as e:
        return jsonify({'error': str(e)})

# Other code ...

if __name__ == '__main__':
    app.run(debug=True)
