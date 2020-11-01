Yêu cầu máy đã có node,yarn.
Trong bản này đang dùng version node 10 nên khuyên dùng node10 để đỡ xung đột

Gõ các lệnh sau:

yarn // cài đặt các thư viện
yarn start // chạy thử trên trình duyệt
yarn build // build file deploy


Hướng dẫn dùng module alias

- Vào file config-overrides.js thêm alias (Chỗ này để khi run nó sẽ hiểu cách viết rút gọn)
- Cập nhật file jsconfig.json (Cái này để thằng Visual code nó hiểu) thiếu cái này vẫn chạy đc nhưng k có gợi ý.
- chạy lại yarn start
- Sau khi thêm các thông tin trên thay vì dùng require("../controllers/userController") có thể dùng require("@controllers/userController"), việc copy đoạn code này  qua file khác cũng sẽ chạy luôn mà không cần sửa lại đường dẫn. Rất ổn khi làm project có nhiều file trong folder.

Hướng dẫn deploy trên windows server


Hướng dẫn deploy trên server linux



