import React, { useContext } from "react";
import { GlobalContext } from "../../provider/globalProvider";

const Footer: React.FC = () => {
  const { theme } = useContext(GlobalContext);
  return (
    <footer className={`${theme}-Footer text-white py-8`}>
      <div
        className="text-3xl font-bold mt-1 mb-5 "
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        Móc's - Tự luyện để giỏi guitar
      </div>
      <div className=" flex flex-row place-content-evenly items-sketch">
        <div className="flex flex-column items-start justify-start">
          <h5 className="text-lg font-bold mb-3">Về Móc's</h5>
          <ul className="list-disc list-inside flex flex-column items-start">
            <li>
              <a href="#" className="hover:text-white">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Tác giả{" "}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {" "}
                Hướng dẫn sử dụng
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-column items-start justify-start">
          <h5 className="text-lg font-bold mb-3">Tài liệu</h5>
          <ul className="list-disc list-inside flex flex-column items-start">
            <li>
              <a href="#" className="hover:text-white">
                Nhạc lý cơ bản{" "}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Nhạc lý nâng cao{" "}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Học đàn qua Youtube{" "}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Gái xinh đánh guitar{" "}
              </a>
            </li>
          </ul>
        </div>{" "}
        <div className="flex flex-column items-start justify-start">
          <h5 className="text-lg font-bold mb-3">Liên hệ</h5>
          <ul className="list-disc list-inside flex flex-column items-start">
            <li>
              <a href="#" className="hover:text-white">
                Báo cáo bugs
              </a>
            </li>
            <li>
              <a href="#" className=" hover:text-white">
                Đóng góp nội dung{" "}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                GOH
              </a>
            </li>
          </ul>
        </div>{" "}
      </div>{" "}
      <div className="text-center mt-20 mb-2">
        <p className="opacity-50 text-sm">© Laughing Thi</p>
      </div>
    </footer>
  );
};

export default Footer;
