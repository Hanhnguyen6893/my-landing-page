'use client'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6">
                            <Shield className="w-4 h-4" />
                            <span>Giải pháp Bảo hiểm Toàn diện 2026</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-6">
                            Bảo vệ tài chính <br />
                            <span className="text-blue-600">Cho gia đình Việt</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                            Chào bạn, tôi là Hạnh Mai Nguyễn. Với chuyên môn trong phát triển sản phẩm bảo hiểm, tôi giúp bạn thiết kế những kế hoạch bảo vệ tối ưu, an tâm tận hưởng cuộc sống.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-200">
                                Nhận tư vấn ngay <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="flex items-center justify-center gap-2 border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all">
                                Xem bảng giá 2026
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            {['Tối ưu quyền lợi', 'Hỗ trợ 24/7', 'Bồi thường nhanh'].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                                alt="Hạnh Mai Nguyễn - Chuyên gia Bảo hiểm"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Trang trí nền */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}