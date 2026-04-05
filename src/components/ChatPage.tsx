import { useState } from "react";
import Icon from "@/components/ui/icon";

const faqItems = [
  {
    question: "Как отследить мой заказ?",
    answer: "Перейдите в раздел «Доставка и трекинг», введите номер заказа или трек-номер в поле поиска. Вся информация о местонахождении посылки отображается в режиме реального времени.",
  },
  {
    question: "Как вернуть товар?",
    answer: "Вы можете оформить возврат в течение 14 дней с момента получения. Перейдите в личный кабинет → Мои заказы → выберите заказ → нажмите «Оформить возврат».",
  },
  {
    question: "Какие способы оплаты доступны?",
    answer: "Мы принимаем банковские карты Visa, Mastercard, МИР, оплату через СБП, Яндекс Пэй, а также наличными при получении.",
  },
  {
    question: "Как изменить адрес доставки?",
    answer: "Изменить адрес можно до момента передачи заказа в службу доставки. Для этого обратитесь в поддержку или отредактируйте адрес в личном кабинете в разделе заказов.",
  },
  {
    question: "Какие сроки доставки?",
    answer: "Стандартная доставка: 3–7 рабочих дней. Экспресс-доставка в пределах города: 1–2 дня. В отдалённые регионы — до 14 рабочих дней.",
  },
];

const initialMessages = [
  {
    id: 1,
    from: "support",
    text: "Добрый день! Я Алина, специалист поддержки Meridian. Чем могу помочь?",
    time: "14:22",
    avatar: "А",
  },
  {
    id: 2,
    from: "user",
    text: "Хочу уточнить статус моего заказа MRD-48291",
    time: "14:24",
    avatar: "Я",
  },
  {
    id: 3,
    from: "support",
    text: "Конечно! Заказ MRD-48291 сейчас находится в пути — передан курьеру СДЭК 2 апреля. Ожидаемая дата доставки — 6 апреля. Вам придёт SMS при поступлении посылки на пункт выдачи.",
    time: "14:25",
    avatar: "А",
  },
];

const ChatPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "faq">("chat");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      from: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      avatar: "Я",
    };
    setMessages([...messages, newMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: "support",
          text: "Спасибо за обращение! Специалист обработает ваш запрос в течение нескольких минут.",
          time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
          avatar: "А",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <p className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-medium mb-1">Поддержка клиентов</p>
        <h1 className="text-2xl font-semibold text-[hsl(var(--primary))]">Центр помощи</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Среднее время ответа", value: "3 мин", icon: "Clock" },
          { label: "Решено сегодня", value: "847", icon: "CheckCircle" },
          { label: "Рейтинг поддержки", value: "4.9 / 5", icon: "Star" },
        ].map((stat, idx) => (
          <div
            key={stat.label}
            className={`bg-white rounded-lg p-4 border border-[hsl(var(--border))] animate-fade-in`}
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon name={stat.icon} size={14} className="text-amber-500" />
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</p>
            </div>
            <p className="text-xl font-semibold text-[hsl(var(--primary))]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[hsl(var(--secondary))] rounded-lg w-fit mb-6">
        {[
          { id: "chat" as const, label: "Чат с поддержкой", icon: "MessageSquare" },
          { id: "faq" as const, label: "Частые вопросы", icon: "HelpCircle" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white text-[hsl(var(--primary))] shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            <Icon name={tab.icon} size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "chat" && (
        <div className="bg-white rounded-lg border border-[hsl(var(--border))] overflow-hidden animate-fade-in" style={{ height: "520px", display: "flex", flexDirection: "column" }}>
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--primary))]">
            <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-[hsl(var(--primary))] font-bold text-sm">А</div>
            <div>
              <p className="text-sm font-semibold text-white">Алина · Поддержка Meridian</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <p className="text-xs text-white/70">Онлайн</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.from === "support"
                    ? "bg-amber-400 text-[hsl(var(--primary))]"
                    : "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
                }`}>
                  {msg.avatar}
                </div>
                <div className={`max-w-xs lg:max-w-md ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`px-4 py-2.5 text-sm leading-relaxed ${msg.from === "user" ? "chat-bubble-user" : "chat-bubble-support"}`}>
                    {msg.text}
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[hsl(var(--border))] flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Напишите сообщение..."
              className="flex-1 border border-[hsl(var(--border))] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[hsl(var(--primary))] transition-colors"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2.5 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--navy-light))] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Icon name="Send" size={15} />
            </button>
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <div className="space-y-3 animate-fade-in">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[hsl(var(--border))] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[hsl(var(--secondary))] transition-colors"
              >
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">{item.question}</span>
                <Icon
                  name={openFaq === idx ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-[hsl(var(--muted-foreground))] shrink-0 ml-3"
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 animate-fade-in">
                  <div className="h-px bg-[hsl(var(--border))] mb-3" />
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}

          <div className="mt-6 p-5 bg-[hsl(var(--primary))] rounded-lg">
            <p className="text-white font-medium mb-1">Не нашли ответ?</p>
            <p className="text-white/70 text-sm mb-3">Наши специалисты готовы помочь в любое время</p>
            <button
              onClick={() => setActiveTab("chat")}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[hsl(var(--primary))] rounded text-sm font-semibold transition-colors"
            >
              Написать в чат
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
