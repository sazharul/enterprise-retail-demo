var table = $("#section_thirteen_table").DataTable();
var checkedData = [];
$(document).ready(function () {

    $("#section_thirteen").submit(function (e) {
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
            .appendTo("#section_thirteen");

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
            product_id: row.find(".product_id").val() ||"",
            combo_product_id: row.find(".combo_product_id").val() ||"",

        };
        console.log(rowData);

        // If "Select All" is checked, add rowData to checkedData
        checkedData = checkedData.filter(function (item) {
            return ((item.product_id !== rowData.product_id) && item.combo_product_id == "") || ((item.combo_product_id !== rowData.combo_product_id) && item.product_id == "");

        });



        console.log(rowData);
        if (isChecked) {
            checkedData.push(rowData);
        }

        // Update the checked state of the checkbox
        checkbox.checked = isChecked;
    });
    // console.log(checkedData);


}

function updateSelectAll(input) {
    var row = $(input).closest("tr");
    var selectAllCheckbox = document.getElementById('selectAll');
    var checkboxes = document.getElementsByClassName('checkbox');
    var allChecked = true;
    // console.log(row.find(".checkbox").val());
    var rowData = {
        product_id: row.find(".product_id").val() ||"",
        combo_product_id: row.find(".combo_product_id").val() ||"",

    };
    // checkedData.push(rowData);
    if ($(input).prop("checked")) {
        checkedData.push(rowData);
    } else {


        checkedData = checkedData.filter(function (item) {
            return ((item.product_id !== rowData.product_id) && item.combo_product_id == "") || ((item.combo_product_id !== rowData.combo_product_id) && item.product_id == "");

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
        var offer_id = $("#offer_id").val();

        $.ajax({
            url: url,
            type: "GET",
            data: {
                offer_id: offer_id,
            },
            success: function (data) {
                // console.log(data);
                // Clear existing rows in the table body
                table.clear().draw()
                // console.log(data);

                if (!(Object.keys(data.products).length === 0 && Object.keys(data.combos).length === 0)) {
                    // Iterate through the products and add rows to the DataTable
                    // console.log(data);
                    $.each(data.products, function (index, product) {
                        var isChecked = checkedData.some(function (
                            item) {
                            return item.product_id ==
                                product.product_id;
                        });
                        // console.log(isChecked);
                        // console.log(product);
                        var row = table.row
                            .add([
                                '<input class="checkbox product_id" type="checkbox" name="product_id[]" value="' + product.product.id + '" onchange="updateSelectAll(this)"' + (isChecked ? ' checked' : '') + '/>',
                                // '<input class="checkbox product_id" type="checkbox" name="product_id[]" value="' + product.product.id + '" onchange="updateSelectAll(this)"/>',
                                product.product.name,
                                product.product.price,
                                product.discounted_price
                            ])
                            .draw(false)
                            .node();
                    });
                    $.each(data.combos, function (index, combo) {
                        var isChecked = checkedData.some(function (
                            item) {
                            return item.combo_product_id ==
                                combo.combo_product_id;
                        });
                        // console.log(isChecked);
                        // console.log(combo);
                        var row = table.row
                            .add([
                                '<input class="checkbox combo_product_id" type="checkbox" name="combo_product_id[]" value="' + combo.combo_product_id + '" onchange="updateSelectAll(this)"' + (isChecked ? ' checked' : '') + '/>',
                                // '<input class="checkbox combo_product_id" type="checkbox" name="combo_product_id[]" value="' + combo.combo_product_id + '" onchange="updateSelectAll(this)"/>',
                                combo.combo_products.name,
                                combo.combo_products.original_price,
                                combo.combo_products.discounted_price
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
