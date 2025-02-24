from confluent_kafka import Producer
import json
import ijson

# Cấu hình Kafka producer
conf = {
    'bootstrap.servers': '192.168.1.12:9092',   # Địa chỉ Kafka server
    'client.id': 'movie-data-producer'
}

producer = Producer(conf)

# Hàm gửi dữ liệu vào Kafka
def send_data_to_kafka(record):
    producer.produce('moviedata', key=str(record["user_id"]), value=json.dumps(record))
    producer.flush()  

# Đọc file JSON lớn từng phần tử một
with open('../data/mock_movie_data_small.json', 'r') as file:
    for record in ijson.items(file, 'item'):
        send_data_to_kafka(record)

print("Dữ liệu đã được gửi vào Kafka.")

