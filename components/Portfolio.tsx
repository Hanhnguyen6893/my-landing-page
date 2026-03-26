import React from "react";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      name: "Gia đình Anh Tuấn Anh",
      title: "Giải pháp bảo vệ thu nhập trụ cột",
      description: "Xây dựng quỹ bảo vệ tài chính 2 tỷ đồng, đảm bảo nguồn sống cho gia đình và quỹ giáo dục cho 2 con nhỏ nếu có rủi ro xảy ra với người trụ cột.",
      tag: "Cá nhân & Gia đình",
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: 2,
      name: "Chị Ngọc Huyền",
      title: "Quỹ hưu trí & Chăm sóc sức khỏe",
      description: "Thiết kế kế hoạch hưu trí an nhàn kết hợp giải pháp thẻ chăm sóc sức khỏe toàn cầu, bảo vệ trước các rủi ro bệnh hiểm nghèo với chi phí đóng linh hoạt.",
      tag: "Sức khỏe cao cấp",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      id: 3,
      name: "Công ty Cổ phần TechABC",
      title: "Bảo hiểm sức khỏe nhóm nhân viên",
      description: "Tối ưu hóa ngân sách phúc lợi doanh nghiệp thông qua gói bảo hiểm sức khỏe hạn mức nội trú & ngoại trú ưu việt cho đội ngũ 50 nhân sự nòng cốt.",
      tag: "Doanh nghiệp",
      color: "bg-purple-100 text-purple-700"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Khách hàng tiêu biểu</h2>
          <p className="mt-4 text-lg text-gray-500">Những giải pháp thực tế đã được thiết kế riêng biệt để bảo vệ tài chính và tương lai cho khách hàng.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolios.map((item) => (
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full" key={item.id}>
              <div className="p-8 flex-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${item.color} mb-4`}>
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <h4 className="text-md font-medium text-blue-600 mb-4">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
              <div className="px-8 pb-8 mt-auto">
                <button className="w-full bg-white text-blue-600 border border-blue-600 font-semibold py-2.5 px-4 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
