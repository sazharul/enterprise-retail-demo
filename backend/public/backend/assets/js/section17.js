var table = $("#section_seventeen_table").DataTable();
var checkedData = [];
$(document).ready(function () {

    $("#section_seventeen").submit(function (e) {
        e.preventDefault();
        // Convert the checkedData array to JSON
        var checkedDataJson = JSON.stringify(checkedData);

        // Add a hidden input field to the form and set its value to the JSON data
        $("<input>")
            .attr({
                type: "hidden",
                name: "checked_data",
                value: checkedDataJson,
            })
            .appendTo("#section_seventeen");

        // Now submit the form
        this.submit();
    });
});


function selectAllCheckboxes() {
    var selectAllCheckbox = document.getElementById('selectAll');
    var isChecked = selectAllCheckbox.checked;


    table.rows({
        page: "all",
    }).nodes().to$().find('input[type="checkbox"]').each(function () {
        var checkbox = this;
        var row = $(checkbox).closest('tr');

        var rowData = {
            product_id: row.find(".checkbox").val(),

        };

        // If "Select All" is checked, add rowData to checkedData
        checkedData = checkedData.filter(function (item) {
            return item.product_id !== rowData.product_id;
        });
        if (isChecked) {
            checkedData.push(rowData);
        }

        // Update the checked state of the checkbox
        checkbox.checked = isChecked;
    });
    console.log(checkedData);


}

function updateSelectAll(input) {
    var row = $(input).closest("tr");
    var selectAllCheckbox = document.getElementById('selectAll');
    var checkboxes = document.getElementsByClassName('checkbox');
    var allChecked = true;

    var rowData = {
        product_id: row.find(".checkbox").val(),
    }
    checkedData.push(rowData);
    if ($(input).prop("checked")) {
        checkedData.push(rowData);
    } else {

            checkedData = checkedData.filter(function (item) {
                return item.product_id !== rowData.product_id;
            });
    }

    // console.log(checkedData);
    for (var i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
            allChecked = false;
            break;
        }
    }

    selectAllCheckbox.checked = allChecked;
}


function updateproduct(e, url) {
    return new Promise((resolve, reject) => {
        var category_id = $("#category_id").val();
        var brand_id = $("#brand_id").val();
        // var offer_id = $("#offer_id").val();
        // console.log(url);
        $.ajax({
            url: url,
            type: "GET",
            data: {
                category_id: category_id,
                brand_id: brand_id,
                // offer_id: offer_id,
            },
            success: function (data) {
                // Clear existing rows in the table body
                // table.clear();
                table.clear().draw()

                if (data.products.length > 0) {
                                        // Iterate through the products and add rows to the DataTable
                                        $.each(data.products, function (index, product) {
                                            var isChecked = checkedData.some(function (
                                                item) {
                                                return item.product_id ==
                                                    product.id;
                                            });
                                            var row = table.row
                                                .add([
                                                    '<input class="checkbox" type="checkbox" name="product_id[]" value="' + product.id + '" onchange="updateSelectAll(this)"' + (isChecked ? ' checked' : '') + '/>',
                                                    product.id,
                                                    product.name,
                                                    product.price,
                                                    product.discount_amount
                                                ])
                                                .draw(false)
                                                .node();
                                        });
                                    } else {
                                        console.log("No products found for the selected category.");
                                        // $('#example tbody').html('<tr><td colspan="100" style="text-align: center;">No data available in this table</td></tr>');
                                    }
                resolve();
            },
            error: function (xhr, status, error) {
                table.clear();
                console.error(xhr.responseText);
                // Handle errors if any

                reject(error);
            },
        });
    });
}
