import deliveryCompanies from "@/data/deliveries.json"

export async function getDeliveries(weight, volume, point1, point2, time) {
    let options = []
    for (const company of deliveryCompanies) {
        const response = await fetch(company.server + "/deliveries?weight=" + weight + "&volume=" + volume + "&from=" + point1 + "&to=" + point2 + "&time=" + time);
        if (response.status !== 200) {
            continue
        }
        let os = JSON.parse(await response.text());
        os.forEach((option) => option.company_id = company.id)
        options = options.concat(os)
    }
    return options
}

function getCompanyServer(company_id) {
    return deliveryCompanies.filter((company) => company.id === company_id)[0].server
}

export async function confirmDelivery(company_id, delivery_id) {
    let server = getCompanyServer(company_id)
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: delivery_id})
    };
    const response = await fetch(server + "/confirm", requestOptions);
    if (response.status !== 200) {
        throw "Unknown error"
    }
    return JSON.parse(await response.text());
}
