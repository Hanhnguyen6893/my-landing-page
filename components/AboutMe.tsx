import React from 'react';

const AboutMe = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-50 opacity-70 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-50 opacity-70 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column: Image & Stats Badge */}
          <div className="w-full lg:w-5/12">
            <div className="relative group">
              <div className="aspect-[4/5] w-full rounded-[2rem] bg-blue-50 overflow-hidden shadow-xl border-8 border-white relative transition-all duration-500 group-hover:shadow-2xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-200">
                  <svg className="w-32 h-32 mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-lg tracking-wide uppercase text-blue-300">Ảnh chuyên gia</span>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-white p-5 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-gray-100 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-2xl sm:text-3xl text-gray-900 leading-none">1000+</h5>
                    <p className="text-sm font-medium text-gray-500 mt-1">Gia đình tin tưởng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full lg:w-7/12 mt-12 lg:mt-0">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-100 text-blue-700 mb-6">
              Về Chuyên Gia
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
              Hạnh Mai Nguyễn
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Với hơn <strong className="text-blue-600 font-semibold">10 năm kinh nghiệm</strong> thực chiến trong ngành bảo hiểm nhân thọ và phi nhân thọ,
                tôi tự hào là người đồng hành đáng tin cậy giúp hàng ngàn cá nhân và gia đình xây dựng bức tranh tài chính vững chắc trước mọi biến cố.
              </p>
              <p>
                Triết lý làm việc của tôi được gói gọn trong hai chữ: <strong className="text-gray-900 font-semibold italic">"Tận tâm - Minh bạch"</strong>.
                Sứ mệnh của tôi không phải là bán các gói bảo hiểm đơn thuần, mà là thiết kế <span className="font-medium">"tấm khiên bảo vệ"</span> được may đo riêng biệt cho
                từng khách hàng dựa trên nền tảng tiềm lực tài chính và định hướng tương lai của bản thân họ.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <h4 className="text-4xl font-extrabold text-blue-600 mb-2">10+</h4>
                <p className="font-medium text-gray-600">Năm Kinh Nghiệm</p>
              </div>
              <div>
                <h4 className="text-4xl font-extrabold text-blue-600 mb-2">24/7</h4>
                <p className="font-medium text-gray-600">Hỗ trợ tận tình</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
