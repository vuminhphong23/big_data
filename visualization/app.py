from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
import pandas as pd
import json
from pymongo import MongoClient
import time

app = Flask(__name__)
socketio = SocketIO(app)

# Kết nối MongoDB
mongo_uri = "mongodb+srv://21011620:TYnr3inIlSfk8huu@cluster0.jvvpq.mongodb.net/moviedata?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client["moviedata"]
collection = db["moviedata"]

# Hàm load dữ liệu từ MongoDB cho biểu đồ rating (lấy 10 dòng gần nhất)
def load_rating_data():
    data = list(collection.find().sort("rating", -1).limit(20))
    if not data:
        return []
    
    df = pd.DataFrame(data)
    df["_id"] = df["_id"].astype(str)

    if "message" in df.columns:
        df["message"] = df["message"].apply(lambda x: json.loads(x) if isinstance(x, str) else x)
        df["movie_name"] = df["message"].apply(lambda x: x.get("movie_name", "Unknown"))
        df["rating"] = df["message"].apply(lambda x: float(x.get("rating", 0)))
        df["account_type"] = df["message"].apply(lambda x: x.get("account_type", "Unknown"))
        df["location"] = df["message"].apply(lambda x: x.get("location", "Unknown"))
        df["device"] = df["message"].apply(lambda x: x.get("device", "Unknown"))
        df["keyword"] = df["message"].apply(lambda x: x.get("keyword", "Unknown"))
    
    df = df.drop_duplicates(subset=["movie_name", "rating", "account_type", "location", "device", "keyword"])
    
    return df.to_dict(orient="records")

# Hàm load dữ liệu từ MongoDB cho các biểu đồ khác (lấy toàn bộ dữ liệu)
def load_all_data():
    data = list(collection.find())
    if not data:
        return []
    
    df = pd.DataFrame(data)
    df["_id"] = df["_id"].astype(str)

    if "message" in df.columns:
        df["message"] = df["message"].apply(lambda x: json.loads(x) if isinstance(x, str) else x)
        df["account_type"] = df["message"].apply(lambda x: x.get("account_type", "Unknown"))
        df["location"] = df["message"].apply(lambda x: x.get("location", "Unknown"))
        df["device"] = df["message"].apply(lambda x: x.get("device", "Unknown"))
        df["keyword"] = df["message"].apply(lambda x: x.get("keyword", "Unknown"))

    return df.to_dict(orient="records")

# Hàm gửi dữ liệu mới cho client khi có thay đổi
def send_updated_data():
    data = load_rating_data()
    socketio.emit('update_data', data)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data/rating")
def get_rating_data():
    data = load_rating_data()
    return jsonify(data)

@app.route("/data/all")
def get_all_data():
    data = load_all_data()
    return jsonify(data)

# Hàm để bắt đầu theo dõi MongoDB 
def watch_mongo_changes():
    while True:
        time.sleep(5)  
        send_updated_data()

# Khởi chạy theo dõi MongoDB trong một thread riêng
from threading import Thread
thread = Thread(target=watch_mongo_changes)
thread.daemon = True
thread.start()

# Sự kiện WebSocket
@socketio.on('connect')
def handle_connect():
    print("Client connected")
    send_updated_data()  # Gửi dữ liệu khi client kết nối

if __name__ == "__main__":
    socketio.run(app, debug=True)