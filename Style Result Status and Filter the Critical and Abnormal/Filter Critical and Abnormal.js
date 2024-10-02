frappe.listview_settings['Lab Test'] = {
    onload: function (listview) {
        // Button for Critical Results (Red Button)
        const critical_button = listview.page.add_button('Critical', function () {
            frappe.route_options = {
                "result_status": ["=", "Critical"]
            };
            frappe.set_route('List', 'Lab Test');
        });
        $(critical_button).css({
            "background-color": "#dc3545", // Red
            "color": "white",
            "border": "none",
            "padding": "5px 10px",
            "border-radius": "4px"
        });

        // Button for Abnormal Results (Yellow Button)
        const abnormal_button = listview.page.add_button('Abnormal', function () {
            frappe.route_options = {
                "result_status": ["=", "Abnormal"]
            };
            frappe.set_route('List', 'Lab Test');
        });
        $(abnormal_button).css({
            "background-color": "#ffc107", // Yellow
            "color": "black",
            "border": "none",
            "padding": "5px 10px",
            "border-radius": "4px"
        });

    }
};

