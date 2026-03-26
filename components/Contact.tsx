"use client";

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", phone: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">Liên hệ tư vấn</h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Hãy để lại thông tin, chuyên gia Hạnh Nguyễn sẽ liên hệ lại với bạn
              trong thời gian sớm nhất để tư vấn giải pháp bảo hiểm phù hợp.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-600 text-xl">
                  📍
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Văn phòng</p>
                  <p className="text-gray-500">123 Đường Tôn Đức Thắng, Quận 1, TP.HCM</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-600 text-xl">
                  📞
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Điện thoại</p>
                  <p className="text-gray-500">0912 345 678</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-600 text-xl">
                  ✉️
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Email</p>
                  <p className="text-gray-500">hanhnguyen.insurance@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Họ và Tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Nhập họ và tên của bạn"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Lời nhắn (Tùy chọn)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="Nội dung bạn muốn tư vấn..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl shadow-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
              </button>

              {submitStatus === "success" && (
                <div className="mt-4 p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium text-center border border-green-200">
                  ✅ Gửi thông tin thành công! Chúng tôi sẽ sớm liên hệ lại.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
