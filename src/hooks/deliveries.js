export function getDeliveries() {
    let deliveries = JSON.parse(localStorage.getItem('deliveries'))
    if (deliveries === null || deliveries === undefined) {
        localStorage.setItem('deliveries', JSON.stringify([]))
        return []
    }
    return deliveries
}

export function addDelivery(delivery) {
    let deliveries = getDeliveries()
    deliveries.push(delivery)
    localStorage.setItem('deliveries', JSON.stringify(deliveries))
}