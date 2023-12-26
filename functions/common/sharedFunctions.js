const admin = require('firebase-admin');

module.exports.UpdateBooking = (bookingData,order_id,transaction_id,gateway) => {
    let curChanges = {
        status: 'NEW',
        prepaid: true,
        transaction_id: transaction_id,
        gateway: gateway
    }
    Object.assign(curChanges, bookingData.paymentPacket);
    admin.database().ref('bookings').child(order_id).update(curChanges);
}

module.exports.addEstimate = (bookingId, driverId, distance) => {
    return true;
}