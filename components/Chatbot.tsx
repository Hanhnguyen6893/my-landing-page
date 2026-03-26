'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, RefreshCw, Send } from 'lucide-react'
import { marked } from 'marked'

type Message = {
    role: 'user' | 'assistant'
    content: string
}

const knowledgeBase = `Tên chuyên gia: Hạnh Mai Nguyễn
Định vị: Chuyên gia Phát triển Sản phẩm Bảo hiểm.
Giải pháp: Thiết kế gói bảo hiểm sức khỏe gia đình, Kế hoạch hưu trí, Bảo hiểm giáo dục.
Kinh nghiệm: 10 năm trong ngành bảo hiểm.
Liên hệ: hanhnguyen.insurance@gmail.com`;

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Cuộn xuống cuối mỗi khi có tin nhắn mới
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Bỏ fetch file từ ngoài để tối ưu tốc độ và dùng trực tiếp biến knowledgeBase

    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setMessages([])
            setIsRefreshing(false)
        }, 500)
    }

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage: Message = { role: 'user', content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            // 1. Dựng prompt gửi tới API bao gồm nội dung bối cảnh
            const payloadMessages = [
                {
                    role: 'system',
                    content: `Bạn là trợ lý AI ảo của Hạnh Mai Nguyễn. Hãy dựa trên bối cảnh sau để tư vấn:\n\n${knowledgeBase}\n\n[QUAN TRỌNG]: Tối ưu hóa tốc độ bằng cách trả lời RẤT NGẮN GỌN, đi thẳng vào trọng tâm. Không giải thích quá dài dòng ở lần đầu.`,
                },
                ...messages,
                userMessage,
            ]

            let streamReader: ReadableStreamDefaultReader<Uint8Array> | null = null;
            let finalError = '';

            const models = [
                'z-ai/glm-4.5-air:free',
                'google/gemini-2.0-flash-lite-preview-02-27:free'
            ];

            for (const modelId of models) {
                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer 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`,
                        'HTTP-Referer': 'http://localhost:3000',
                        'X-Title': 'Insurance Chatbot'
                    },
                    body: JSON.stringify({
                        model: modelId,
                        messages: payloadMessages,
                        stream: true // Phục hồi luồng gõ chữ mượt mà
                        // Đã BỎ XÓA max_tokens để bot có không gian trả lời đầy đủ, không bị cắt cụt!
                    }),
                });

                if (!response.ok) {
                    const err = await response.json().catch(() => ({}));
                    finalError = err.error?.message || response.statusText;
                    continue; // Lỗi HTTP -> Thử Server dự phòng
                }

                // Nếu OpenRouter ép trả về JSON lỗi báo 'Provider returned error' (Model chặn Stream) thay vì luồng file text
                const contentType = response.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                    const json = await response.json();
                    if (json.error) {
                        finalError = json.error.message;
                        continue; // Tiếp tục chuyển sang Model số 2
                    }
                }

                // Nếu chạy stream trơn tru, lưu lại kết nối dữ liệu!
                if (response.body) {
                    streamReader = response.body.getReader();
                    break;
                }
            }

            if (!streamReader) {
                setMessages((prev) => [...prev, {
                    role: 'assistant',
                    content: `Toàn bộ server AI đều nghẽn. Lỗi: **${finalError}**.`
                }]);
                setIsLoading(false);
                return;
            }

            // Tắt chức năng hiển thị sớm luồng rỗng, chỉ hiển thị UI khi chữ thực sự bắt đầu phun ra
            let hasStartedReceivingText = false;
            let currentAssistantContent = "";
            const decoder = new TextDecoder('utf-8');
            let done = false;
            let partialLine = '';

            while (!done) {
                const { value, done: doneReading } = await streamReader.read();
                done = doneReading;
                if (value) {
                    const chunkValue = decoder.decode(value, { stream: true });
                    const text = partialLine + chunkValue;
                    const lines = text.split('\n');
                    partialLine = lines.pop() || ''; // Cất phần dư chưa xuống dòng đi

                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith('data: ') && trimmedLine !== 'data: [DONE]') {
                            try {
                                const parsed = JSON.parse(trimmedLine.slice(6));
                                const contentDelta = parsed.choices[0]?.delta?.content || "";

                                if (contentDelta) {
                                    if (!hasStartedReceivingText) {
                                        // 30 giây đầu AI "Suy nghĩ" (Reasoning), chỉ tắt chấm bi khi chữ Content chuẩn bắt đầu phun.
                                        hasStartedReceivingText = true;
                                        setIsLoading(false);
                                        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
                                    }

                                    currentAssistantContent += contentDelta;
                                    setMessages((prev) => {
                                        const newMsgs = [...prev];
                                        // Gắn chữ mới nối vào tin nhắn cuối cùng
                                        newMsgs[newMsgs.length - 1] = {
                                            ...newMsgs[newMsgs.length - 1],
                                            content: currentAssistantContent
                                        };
                                        return newMsgs;
                                    });
                                }
                            } catch (e) {
                                // Vô tình cắt đoạn JSON, tiếp tục nối luồng
                            }
                        }
                    }
                }
            }

            // Xả Loading nốt nếu stream tắt mà không có chữ nào (Do mạng/API lỗi trắng)
            if (!hasStartedReceivingText) setIsLoading(false);
        } catch (error) {
            console.error(error)
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Có lỗi xảy ra khi kết nối. Vui lòng kiểm tra lại mạng hoặc thử lại sau.' },
            ])
            setIsLoading(false)
        }
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-24 right-6 w-[360px] md:w-96 h-[500px] z-50 flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-xl border border-white/40"
                    >
                        {/* Header: Glassmorphism với chấm xanh */}
                        <div className="bg-blue-600/90 backdrop-blur-md text-white p-4 flex items-center justify-between border-b border-blue-500/30">
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden shadow-inner border border-blue-400">
                                        <img
                                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&auto=format&fit=crop"
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Chấm xanh nhấp nháy online */}
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-600 animate-pulse"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-wide shadow-sm">Maha - Trợ lý hỏi đáp</h3>
                                    <p className="text-xs text-blue-100/90 tracking-wider">Trực tuyến</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 z-10">
                                {/* Nút Refresh - Xóa chat xoay 500ms */}
                                <button
                                    onClick={handleRefresh}
                                    className={`p-2 rounded-full hover:bg-white/20 transition-all ${isRefreshing ? 'rotate-180 duration-500' : ''
                                        }`}
                                    aria-label="Làm mới chat"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/20 transition-all"
                                    aria-label="Đóng chat"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-200">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 text-sm mt-10 animate-fade-in">
                                    <div className="w-16 h-16 bg-blue-50 border border-blue-100/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <MessageSquare className="w-8 h-8 text-blue-400" />
                                    </div>
                                    Xin chào! Tôi là Maha - Trợ lý hỏi đáp của chuyên gia Hạnh Mai Nguyễn. Tôi có thể giúp gì cho bạn về các giải pháp bảo hiểm?
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-tr-sm'
                                            : 'bg-white/90 text-gray-800 rounded-tl-sm border border-gray-100 backdrop-blur-sm'
                                            }`}
                                    >
                                        {msg.role === 'user' ? (
                                            msg.content
                                        ) : (
                                            <div
                                                // Render UI đẹp với thư viện marked
                                                className="prose prose-sm prose-p:my-1 prose-headings:my-2 prose-blue max-w-none break-words"
                                                dangerouslySetInnerHTML={{
                                                    __html: marked.parse(msg.content) as string,
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Hiệu ứng 'Đang nhập...' */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/90 p-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex gap-1 items-center h-10 w-16 justify-center">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <form
                            onSubmit={sendMessage}
                            className="p-3 bg-white/50 backdrop-blur-md border-t border-white/40"
                        >
                            <div className="flex items-center gap-2 bg-white/80 rounded-full p-1 pl-4 shadow-inner border border-gray-100">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Gửi câu hỏi tư vấn..."
                                    disabled={isLoading}
                                    className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-2.5 rounded-full hover:from-blue-700 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md flex-shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                                ⚡ Powered by z-ai/glm-4.5-air:free
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Nút bấm nổi Floating Chat */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-full shadow-2xl flex items-center justify-center text-white z-50 border-2 border-white/40 backdrop-blur-sm group hover:shadow-blue-500/40 transition-shadow"
                    aria-label="Mở khung chat"
                >
                    <div className="relative">
                        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        {/* Chấm đỏ nhảy thông báo */}
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-blue-600 animate-pulse"></div>
                    </div>
                </motion.button>
            )}
        </>
    )
}
