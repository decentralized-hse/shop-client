export function getBookings() {
    let bookings = JSON.parse(localStorage.getItem('bookings'))
    if (bookings === null || bookings === undefined) {
       localStorage.setItem('bookings', JSON.stringify([]))
        return []
    }
    return bookings
}

export function addBooking(booking) {
    let bookings = getBookings()
    bookings.push(booking)
    localStorage.setItem('bookings', JSON.stringify(bookings))
}

export function deleteBooking(vendor_id, booking_id) {
    let bookings = getBookings()
    console.log("vendor id:" + vendor_id, "id:" + booking_id)
    console.log("bookings before delete")
    console.log(bookings)
    bookings = bookings.filter((it) => !(it.item.vendor_id === vendor_id && it.id === booking_id))
    console.log("bookings after delete")
    console.log(bookings)
    localStorage.setItem('bookings', JSON.stringify(bookings))
}
