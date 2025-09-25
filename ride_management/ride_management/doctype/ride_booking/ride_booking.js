// Copyright (c) 2025, Aman and contributors
// For license information, please see license.txt

frappe.ui.form.on("Ride Booking", {
	
	before_save(frm) {
		if (!frm.doc.naming_series && frm.doc.vehicle && frm.doc.phone_number) {
			let last_four_digits = frm.doc.phone_number.slice(-4);
			frm.set_value("naming_series", `${frm.doc.vehicle}-2025-${last_four_digits}-`);
		}
		calculate_total(frm);
	}
});


// function to calculate total summing up amount from sevices table * price per km
function calculate_total(frm) {
	let total = 0;
	frm.doc.services.forEach(function (d) {
		total += d.amount * d.price_per_km;
	});
	frm.set_value("total_amount", total);
}