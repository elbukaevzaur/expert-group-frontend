import {OrderStatusEnum} from "@/lib/models";

const STATUS_MAP: Record<OrderStatusEnum, { title: string; description: string, actions: OrderStatusEnum[], actionTitle: string }> = {
    [OrderStatusEnum.PENDING]: { title: "Ожидание", description: "Ваш заказ обрабатывается", actions: [OrderStatusEnum.CANCELLED], actionTitle: '' },
    [OrderStatusEnum.ACCEPT]: { title: "Принят", description: "Ваш заказ принят", actions: [OrderStatusEnum.CANCELLED], actionTitle: '' },
    [OrderStatusEnum.DELIVERY]: { title: "Доставляется", description: "Ваш заказ доставляется", actions: [], actionTitle: '' },
    [OrderStatusEnum.COMPLETE]: { title: "Завершен", description: "Ваш заказ завершен", actions: [], actionTitle: '' },
    [OrderStatusEnum.CANCELLED]: { title: "Отклонено", description: "Ваш заказ отклонен", actions: [], actionTitle: 'Отменить заказ' },
};

export const getStatusInfo = (status: OrderStatusEnum) => STATUS_MAP[status] || { title: "Неизвестно", description: "Статус не найден", actions: [], actionTitle: '' };
