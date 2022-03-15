import vendors from "@/data/vendors.json"

export async function getItemsByString(searchString) {
    let items = []
    for (const vendor of vendors) {
        const response = await fetch(vendor.server + "/items_by_string?query=" + searchString);
        if (response.status !== 200) {
            throw "Unknown error"
        }
        let search_result = JSON.parse(await response.text());
        search_result.forEach((item) => item.vendor_id = vendor.id)
        items = items.concat(search_result)
    }
    return items
}

function getVendorServer(vendor_id) {
    return vendors.filter((vendor) => vendor.id === vendor_id)[0].server
}

export async function bookItem(vendor_id, item_id, quantity) {
    let vendor_server = getVendorServer(vendor_id);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({item_id: item_id, quantity: quantity})
    };
    const response = await fetch(vendor_server + "/booking", requestOptions);
    if (response.status !== 200) {
        throw "Unknown error"
    }
    // returns {id: "string", address: "address", available_date: "date"}
    return JSON.parse(await response.text());
}

export async function cancelBooking(vendor_id, booking_id) {
    let vendor_server = getVendorServer(vendor_id);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({booking_id: booking_id})
    };
    const response = await fetch(vendor_server + "/cancel_booking", requestOptions);
    if (response.status !== 200) {
        throw "Unknown error"
    }
}

export async function confirmPurchase(vendor_id, booking_id) {
    let vendor_server = getVendorServer(vendor_id);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({booking_id: booking_id})
    };
    const response = await fetch(vendor_server + "/confirm_booking", requestOptions);
    if (response.status !== 200) {
        throw "Unknown error"
    }
}
