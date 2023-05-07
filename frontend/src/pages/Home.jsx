import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg01 from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import wordImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";
import Subtitle from "../shared/Subtitle";

import ServiceList from "../services/ServiceList";
import FeatureTourList from "../components/Featured-tours/FeatureTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonials/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Có thể bạn chưa biết !"} />
                  <img src={wordImg} alt="" />
                </div>
                <h1>
                  Du lịch là chìa khóa tạo nên{" "}
                  <span className="hightlight"> kí ức</span>
                </h1>
                <p>
                  Hãy đặt ngay 1 chuyến du lịch, bạn sẽ đến với hàng ngàn cung
                  bậc cảm xúc và có những kỉ niệm đáng nhớ bên người thân và gia
                  đình, cùng nhau trải nghiệm những điều mới lạ và gặp gỡ những
                  thành phố mới, văn hóa mới, con người mới.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg01} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* {feature tour section} */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Khám phá"}>
                <h2 className="feature__tour--title">
                  Những tour du lịch hấp dẫn của chúng tôi
                </h2>
              </Subtitle>
            </Col>
            <FeatureTourList />
          </Row>
        </Container>
      </section>
      {/* {experience section} */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Về kinh nghiệm"} />

                <h2>
                  Với tất cả kinh nghiệm làm việc, chúng tôi sẽ đem lại cho bạn
                  trải nghiệm tuyệt vời nhẩt !
                </h2>
                <p>
                  Hãy chậm lại một nhịp sống
                  <br />
                  Để cảm nhận thiên nhiên tươi đẹp và đi đến các vùng đất mới,
                  thành phố mới, con người mới để lấy lại năng lượng sau những
                  ngày mệt mỏi.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Chuyến du lịch</h6>
                </div>
                <div className="counter__box">
                  <span>3k+</span>
                  <h6>Khách hàng</h6>
                </div>
                <div className="counter__box">
                  <span>5k+</span>
                  <h6>Năm kinh nghiệm</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* gallery section */}
      <section>
        <Container>
          <Col lg="12">
            <Subtitle subtitle={"Gallery"} />
            <h2 className="gallery__title">
              Những bức ảnh chân thực nhất từ du khách
            </h2>
          </Col>
          <Col lg="12">
            <MasonryImagesGallery />
          </Col>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle="Fan love" />
              <h2 className="testimonial__title">
                Khách hàng nói gì về chúng tôi
              </h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
        <Newsletter />
      </section>
    </>
  );
};

export default Home;
