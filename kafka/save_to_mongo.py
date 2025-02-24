from pymongo import MongoClient

# Kết nối đến MongoDB
mongo_uri = "mongodb+srv://21011620:TYnr3inIlSfk8huu@cluster0.jvvpq.mongodb.net/moviedata?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client["moviedata"]
collection = db["moviedata"]

def save_to_mongo(data):
    if data:  
        collection.insert_one(data)
        print(f"Đã lưu vào MongoDB: {data}")