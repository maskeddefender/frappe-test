// Copyright (c) 2025, Aman and contributors
// For license information, please see license.txt

frappe.ui.form.on("Ride Booking", {
	
	refresh(frm) {
		calculate_total(frm);
	},
	
	before_save(frm) {
		if (!frm.doc.naming_series && frm.doc.vehicle && frm.doc.phone_number) {
			let last_four_digits = frm.doc.phone_number.slice(-4);
			frm.set_value("naming_series", `${frm.doc.vehicle}-2025-${last_four_digits}-`);
		}
		calculate_total(frm);
	},
	
	estimated_km: function(frm) {
		calculate_total(frm);
	},
	
	price_per_km: function(frm) {
		calculate_total(frm);
	}
});

frappe.ui.form.on("Ride Booking Service", {
	services_remove: function(frm, cdt, cdn) {
		calculate_total(frm);
	},
	
	amount: function(frm, cdt, cdn) {
		calculate_total(frm);
	}
});

function calculate_total(frm) {
	let total = 0;
	
	let base_amount = 0;
	if (frm.doc.price_per_km && frm.doc.estimated_km) {
		base_amount = flt(frm.doc.price_per_km) * flt(frm.doc.estimated_km);
	}
	let services_total = 0;
	if (frm.doc.services) {
		frm.doc.services.forEach(function(d) {
			if (d.amount) {
				services_total += flt(d.amount);
			}
		});
	}
	
	total = base_amount + services_total;
	
	frm.set_value("total_amount", total);
	
	frm.refresh_field("total_amount");
}