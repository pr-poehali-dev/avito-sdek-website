import { useState } from "react";
import Icon from "@/components/ui/icon";

const orders = [
  {
    id: "MRD-48291",
    product: "Ноутбук Dell XPS 15",
    date: "28 марта 2026",
    status: "transit",
    statusLabel: "В пути",
    eta: "6 апреля 2026",
    carrier: "СДЭК",
    from: "Москва",
    to: "Санкт-Петербург",
    price: "129 990 ₽",
    steps: [
      { label: "Заказ оформлен", date: "28 мар", done: true },
      { label: "Передан в доставку", date: "29 мар", done: true },
      { label: "В сортировочном центре", date: "31 мар", done: true },
      { label: "В пути", date: "2 апр", done: true },
      { label: "Доставлен", date: "6 апр", done: false },
    ],
  },
  {
    id: "MRD-47103",
    product: "Наушники Sony WH-1000XM5",
    date: "15 марта 2026",
    status: "delivered",
    statusLabel: "Доставлен",
    eta: "20 марта 2026",
    carrier: "Почта России",
    from: "Екатеринбург",
    to: "Казань",
    price: "34 990 ₽",
    steps: [
      { label: "Заказ оформлен", date: "15 мар", done: true },
      { label: "Передан в доставку", date: "16 мар", done: true },
      { label: "В сортировочном центре", date: "18 мар", done: true },
      { label: "В пути", date: "19 мар", done: true },
      { label: "Доставлен", date: "20 мар", done: true },
    ],
  },
  {
    id: "MRD-46789",
    product: "Кофемашина Delonghi Magnifica",
    date: "2 марта 2026",
    status: "processing",
    statusLabel: "Обрабатывается",
    eta: "8 апреля 2026",
    carrier: "Boxberry",
    from: "Москва",
    to: "Новосибирск",
    price: "67 500 ₽",
    steps: [
      { label: "Заказ оформлен", date: "2 апр", done: true },
      { label: "Передан в доставку", date: "", done: false },
      { label: "В сортировочном центре", date: "", done: false },
      { label: "В пути", date: "", done: false },
      { label: "Доставлен", date: "", done: false },
    ],
  },
];

const statusBadge: Record<string, string> = {
  delivered: "status-delivered",
  transit: "status-transit",
  processing: "status-processing",
  cancelled: "status-cancelled",
};

const DeliveryPage = () => {
  const [selected, setSelected] = useState<string | null>(orders[0].id);
  const [trackInput, setTrackInput] = useState("");

  const selectedOrder = orders.find((o) => o.id === selected);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <p className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-medium mb-1">Управление заказами</p>
        <h1 className="text-2xl font-semibold text-[hsl(var(--primary))]">Доставка и трекинг</h1>
      </div>

      {/* Track by number */}
      <div className="mb-8 bg-[hsl(var(--primary))] rounded-lg p-6 animate-slide-up">
        <p className="text-white/70 text-sm mb-3">Отследить по номеру заказа или трек-номеру</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={trackInput}
            onChange={(e) => setTrackInput(e.target.value)}
            placeholder="Например: MRD-48291 или 1234567890"
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-colors"
          />
          <button className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-[hsl(var(--primary))] font-semibold rounded text-sm transition-colors flex items-center gap-2">
            <Icon name="Search" size={15} />
            Найти
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders list */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-medium">Мои заказы</p>
          {orders.map((order, idx) => (
            <div
              key={order.id}
              onClick={() => setSelected(order.id)}
              className={`bg-white rounded-lg p-4 cursor-pointer transition-all duration-200 border-2 card-hover animate-fade-in stagger-${idx + 1} ${
                selected === order.id
                  ? "border-[hsl(var(--primary))] shadow-md"
                  : "border-transparent hover:border-[hsl(var(--border))]"
              }`}
              style={{ animationDelay: `${idx * 0.07}s` }}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-sm text-[hsl(var(--foreground))] leading-tight">{order.product}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 shrink-0 ${statusBadge[order.status]}`}>
                  {order.statusLabel}
                </span>
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{order.id} · {order.date}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <Icon name="MapPin" size={12} className="text-[hsl(var(--muted-foreground))]" />
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{order.from} → {order.to}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order detail */}
        {selectedOrder && (
          <div className="lg:col-span-2 space-y-4 animate-fade-in">
            <div className="bg-white rounded-lg p-6 border border-[hsl(var(--border))]">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-1">Заказ {selectedOrder.id}</p>
                  <h2 className="text-lg font-semibold text-[hsl(var(--primary))]">{selectedOrder.product}</h2>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusBadge[selectedOrder.status]}`}>
                  {selectedOrder.statusLabel}
                </span>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-[hsl(var(--border))]">
                {[
                  { label: "Стоимость", value: selectedOrder.price, icon: "CreditCard" },
                  { label: "Перевозчик", value: selectedOrder.carrier, icon: "Truck" },
                  { label: "Ожидаемая дата", value: selectedOrder.eta, icon: "Calendar" },
                  { label: "Маршрут", value: `${selectedOrder.from} → ${selectedOrder.to}`, icon: "Route" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon name={item.icon} size={12} className="text-[hsl(var(--muted-foreground))]" />
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{item.label}</p>
                    </div>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <p className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-medium mb-4">История доставки</p>
              <div className="relative">
                {selectedOrder.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 transition-all ${
                        step.done
                          ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))]"
                          : "bg-white border-[hsl(var(--border))]"
                      }`}>
                        {step.done
                          ? <Icon name="Check" size={14} className="text-white" />
                          : <div className="w-2 h-2 rounded-full bg-[hsl(var(--border))]" />
                        }
                      </div>
                      {idx < selectedOrder.steps.length - 1 && (
                        <div className={`w-0.5 h-8 mt-1 ${step.done ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`} />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm font-medium ${step.done ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                        {step.label}
                      </p>
                      {step.date && <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[hsl(var(--border))] rounded text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors">
                <Icon name="Download" size={15} />
                Скачать накладную
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[hsl(var(--primary))] rounded text-sm font-medium text-white hover:bg-[hsl(var(--navy-light))] transition-colors">
                <Icon name="MessageSquare" size={15} />
                Связаться с поддержкой
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPage;
