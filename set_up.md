# Hướng dẫn chạy mô hình 
**1. Cần cài đặt kafka về máy**
**2. Setup 1 số file trước khi chạy kafka**
Chạy lệnh `ipconfig` trên cmd để lấy IPv4 hiện tại của máy đang sử dụng.
Thay IPv4 đó vào trong file server.properties
    advertised.listeners=PLAINTEXT://<<IPV4 của bạn>>
**3. Khởi động Kafka**
    bin\windows\zookeeper-server-start.bat config\zookeeper.properties
    bin\windows\kafka-server-start.bat config\server.properties
**4. Chạy file `kafka_producer.py` để gửi dữ liệu đến Kafka topic moviedata**
**5. Chạy file `kafka_consumer.py` để nhận dữ liệu từ Kafka topic xử lý, làm sạch, sau đó đẩy lên MongoDB**
**6. Chạy file `app.py` trong visualization để mở trang dashboard trực quan**
    


