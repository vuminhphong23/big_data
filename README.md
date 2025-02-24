## Phân tích dữ liệu về tìm kiếm film trên nền tảng Netflix
Hệ thống thu thập từ khóa tìm kiếm phim từ người dùng khi họ tìm kiếm các bộ phim, cùng với các từ khóa tìm kiếm hệ thống cũng sẽ lấy ra các thông tin khác từ tài khoản người dùng tìm kiếm,
các từ khóa, thông tin này sau đó được gửi đến **Apache Kafka**, nơi chúng được xử lý và phân tích theo thời gian thực. *( Ở đây chúng tôi giả lập bằng data json ảo được tạo ra thủ công để mô phỏng ).* 

Trong Kafka, dữ liệu được chia thành các **topic**, giúp tổ chức và quản lý thông tin hiệu quả. 
Các **producers** sẽ đẩy từ khóa vào topic tương ứng, trong khi các **consumers** lắng nghe dữ liệu để thực hiện phân tích. 
Kết quả sau đó có thể được sử dụng để xác định xu hướng tìm kiếm, tối ưu hóa hệ thống gợi ý phim hoặc cải thiện bộ lọc tìm kiếm.  

Việc triển khai Kafka trong mạng **LAN nội bộ** giúp hệ thống đạt được tốc độ xử lý cao, giảm độ trễ và tối ưu tài nguyên. 
Ngoài ra, khả năng **mở rộng linh hoạt** của Kafka cho phép dễ dàng bổ sung thêm producer hoặc consumer khi hệ thống cần xử lý khối lượng dữ liệu lớn hơn. 
Hệ thống này không chỉ giúp nâng cao trải nghiệm người dùng mà còn hỗ trợ các chiến lược nội dung dựa trên phân tích hành vi tìm kiếm.


Trong Kafka, dữ liệu được chia thành các **topic**, giúp tổ chức và quản lý thông tin hiệu quả. Các **producers** sẽ đẩy từ khóa vào topic tương ứng, 
trong khi các **consumers** lắng nghe dữ liệu để thực hiện phân tích. Trước khi phân tích, từ khóa sẽ trải qua quá trình **tiền xử lý dữ liệu** nhằm đảm bảo độ chính xác và nhất quán. 
Quá trình này bao gồm chuẩn hóa từ khóa, loại bỏ ký tự đặc biệt, sửa lỗi chính tả bằng **SymSpell**, xác định ngôn ngữ bằng **langid**, và loại bỏ các từ khóa không hợp lệ. Nhờ đó, hệ thống có thể xử lý dữ liệu đầu vào một cách hiệu quả, tránh nhiễu thông tin.
Sau khi xử lý, dữ liệu sẽ được lưu trữ trong **MongoDB**, một hệ quản trị cơ sở dữ liệu phi quan hệ linh hoạt, hỗ trợ truy vấn nhanh chóng.
Sau khi làm sạch và lưu trữ data được sử dụng để trực quan hóa các biểu đồ, giúp xác định xu hướng tìm kiếm, từ đó tối ưu hóa hệ thống gợi ý phim hoặc cải thiện bộ lọc tìm kiếm. Quy trình thực hiện 1 cách thuông suốt, tự động.
  

Việc triển khai Kafka trong mạng **LAN nội bộ** giúp hệ thống đạt được tốc độ xử lý cao, giảm độ trễ và tối ưu tài nguyên. 
Ngoài ra, khả năng **mở rộng linh hoạt** của Kafka cho phép dễ dàng bổ sung thêm producer hoặc consumer khi hệ thống cần xử lý khối lượng dữ liệu lớn hơn. 
Hệ thống này không chỉ giúp nâng cao trải nghiệm người dùng mà còn hỗ trợ các chiến lược nội dung dựa trên phân tích hành vi tìm kiếm.


## Hướng dẫn chạy mô hình có trong `setup.md`
