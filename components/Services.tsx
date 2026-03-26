'use client'
import { motion } from 'framer-motion'
import { HeartPulse, Briefcase, GraduationCap, Umbrella } from 'lucide-react'

const services = [
    {
        title: 'Bảo hiểm Sức khỏe',
        desc: 'Bảo vệ bạn và gia đình trước mọi rủi ro y tế với hệ thống bệnh viện chuẩn quốc tế.',
        icon: HeartPulse,
        color: 'bg-rose-50 text-rose-600',
    },
    {
        title: 'Kế hoạch Hưu trí',
        desc: 'Xây dựng dòng tiền ổn định để an tâm tận hưởng tuổi vàng tự do tài chính.',
        icon: Umbrella,
        color: 'bg-blue-50 text-blue-600',
    },
    {
        title: 'Bảo hiểm Giáo dục',
        desc: 'Đảm bảo tương lai học vấn vững chắc cho con yêu ngay từ hôm nay.',
        icon: GraduationCap,
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        title: 'Giải pháp Doanh nghiệp',
        desc: 'Gói phúc lợi toàn diện giúp doanh nghiệp thu hút và giữ chân nhân tài.',
        icon: Briefcase,
        color: 'bg-amber-50 text-amber-600',
    },
]

export default function Services() {
    return (
        <section id="services" className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
                    >
                        Giải pháp chuyên sâu cho từng nhu cầu
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <service.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-4">{service.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}