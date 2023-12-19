export default function formatMoneyVN(money: number) {
    
    return money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}