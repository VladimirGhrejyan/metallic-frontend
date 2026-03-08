import * as XLSX from 'xlsx';
import type { GetOrderByIdApiResponse } from '~entities/order';

export function downloadOrderAsXlsx(order: GetOrderByIdApiResponse): void {
    const rows: unknown[][] = [
        ['Պատվեր', order.id],
        ['Գործընկեր', order.client.name],
        ['ՀՎՀՀ', order.client.taxpayerRegistrationNumber ?? ''],
        [],
        ['Անվանում', 'Կոդ', 'Քանակ', 'Միավորի գին', 'Ընդհանուր'],
    ];

    for (const item of order.items) {
        const title = item.productSnapshot?.title ?? item.product?.title ?? '—';
        const code = item.productSnapshot?.code ?? item.product?.code ?? '—';
        const total = item.count * item.price;
        rows.push([title, code, item.count, item.price, total]);
    }

    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Order');
    const filename = `պատվեր-${order.id}.xlsx`;
    XLSX.writeFile(wb, filename);
}
