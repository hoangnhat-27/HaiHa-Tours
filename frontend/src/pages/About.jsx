import React from "react";
import { Container, Row, Col } from "reactstrap";
import logo from "./../assets/images/logo.png";

const About = () => {
  return (
    <section>
      <Container>
        <div className="text-center">
          <h2>Giới thiệu về công ty Hải Hà</h2>
        </div>
        <Row>
          <Col lg="12" className="pt-5">
            <img src={logo} alt="" style={{ width: "500px", float: "right" }} />
            <p>
              Thành lập năm 2002, Công ty Hải Hà là thành viên của Tập đoàn TMG
              Việt Nam với hơn 20 năm kinh nghiệm trong lĩnh vực Du lịch. Công
              ty Hải Hà tiên phong trong việc sáng tạo các sản phẩm du lịch tiện
              ích dành cho khách hàng nội địa. Liên tục tăng trưởng mạnh qua
              nhiều năm, công ty Hải Hà hiện là OTA hàng đầu Việt Nam trong phân
              khúc cao cấp với hệ thống khoảng 2,500 tour du lịch mỗi năm. Với
              mục tiêu mang đến cho khách hàng “Trải nghiệm kỳ nghỉ tuyệt vời”,
              công ty Hải Hà kỳ vọng trở thành nền tảng du lịch nghỉ dưỡng số 1
              cho khách hàng Đông Nam Á trong 5 năm tới. Dòng sản phẩm chính của
              Công ty Hải Hà là những tour du lịch đầy đủ tiện nghi và chất
              lượng nhất chỉ trong 1 lần đặt. Với combo du lịch khách hàng không
              cần băn khoăn chọn lựa hoặc mất thời gian đặt từng dịch vụ riêng
              lẻ, lại còn hưởng được mức giá vô cùng tốt với những dòng combo
              công ty Hải Hà mang lại. Để đảm bảo cho khách hàng một “Trải
              nghiệm kỳ nghỉ tuyệt vời”, chúng tôi áp dụng công nghệ vào việc
              đọc hiểu nhu cầu của thị trường, nghiên cứu phát triển sản phẩm và
              gợi ý những sản phẩm và dịch vụ tốt nhất, phù hợp với từng khách
              hàng. Khách hàng chọn đặt dịch vụ với công ty Hải Hà có thể đặt
              qua rất nhiều kênh: đặt trực tiếp tại website, gọi điện thoại
              Hotline, đặt qua Facebook và các mạng xã hội khác. Với công ty Hải
              Hà mỗi kỳ nghỉ là một trải nghiệm tuyệt vời!
            </p>
          </Col>
        </Row>
        <div>
          <b>Vui lòng liên hệ:</b>
          <p>
            1. Dịch vụ khách hàng, đặt phòng khách sạn: Hotline 1900 1870 –
            Email: haiha@company.vn
          </p>
          <p>2. Nhà cung cấp liên hệ - Email: haiha@company.vn</p>
          <p>3. Liên hệ Marketing - Email: marketing@haiha.com</p>
          <p>4. Các liên hệ khác: 1900 1870</p>
        </div>
      </Container>
    </section>
  );
};

export default About;
