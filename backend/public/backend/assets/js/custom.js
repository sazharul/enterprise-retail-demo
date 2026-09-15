function setupEditablePrice(url, className, idAttribute) {
    $(document).ready(function () {
        var table = $("table").DataTable();

        // Include CSRF token for AJAX requests
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });

        var pendingUpdate = {}; // To store pending updates

        // Handle price updates on input change
        $(document).on("input", className, function () {
            var id = $(this).data(idAttribute);
            var newValue = $(this).text();

            // Store the pending update
            pendingUpdate[id] = newValue;
        });

        // Handle price updates on blur (clicking outside the box)
        $(document).on("blur", className, function () {
            var id = $(this).data(idAttribute);

            // Check if there's a pending update for the current ID
            if (pendingUpdate.hasOwnProperty(id)) {
                var newValue = pendingUpdate[id];

                // Perform AJAX update
                updatePrice(url, id, newValue);

                // Remove the update from the pending updates
                delete pendingUpdate[id];
            }
        });
    });

    function updatePrice(url, id, newValue) {
        $.ajax({
            url: url + "/" + id,
            method: "POST",
            data: {
                price: newValue,
            },
            success: function (response) {
                // Handle success if needed
                // Alert.success('Success Title', 'Price updated successfully!');
                Swal.fire({
                    title: "Success!",
                    text: "Price Updated",
                    icon: "success",
                });
            },
            error: function (error) {
                // Handle error if needed
                Swal.fire({
                    title: "Failed!",
                    text: "Price not Updated",
                    icon: "error",
                });
            },
        });
    }

    // all the code from prev works
}

// $(document).ready(function () {
//     // Initialize DataTable
//     var table = $("#example").DataTable();

//     // Handle "Select All" checkbox
//     $("#checkboxesMain").on("change", function () {
//         var isChecked = $(this).prop("checked");

//         // Check only visible rows
//         table
//             .rows({
//                 page: "all",
//             })
//             .nodes()
//             .to$()
//             .find('input[type="checkbox"]')
//             .prop("checked", isChecked);
//     });

//     // Handle individual checkboxes
//     $("#example tbody").on("change", 'input[type="checkbox"]', function () {
//         if (!this.checked) {
//             $("#checkboxesMain").prop("checked", false);
//         }
//     });

//     $(".percent_discount").on("onchange", function () {
//         let existing_price = $(this).closest("tr").find(".price").html();
//         let percentDiscount = $(this).val();
//         let exact_discount = (parseInt(existing_price) * percentDiscount) / 100;
//         $(this)
//             .closest("tr")
//             .find(".flat_discount")
//             .val(exact_discount.toFixed(2));
//         let current_price = parseInt(existing_price) - exact_discount;
//         $(this)
//             .closest("tr")
//             .find(".current_price_input")
//             .val(current_price.toFixed(2));
//     });

//     $(".flat_discount").on("onchange", function () {
//         let existing_price = $(this).closest("tr").find(".price").html();
//         let exactDiscount = $(this).val();
//         let percentDiscount = (exactDiscount * 100) / parseInt(existing_price);
//         $(this)
//             .closest("tr")
//             .find(".percent_discount")
//             .val(percentDiscount.toFixed(2));
//         let current_price = parseInt(existing_price) - exactDiscount;
//         $(this)
//             .closest("tr")
//             .find(".current_price_input")
//             .val(current_price.toFixed(2));
//     });

//     // Handle discount type change
//     $('input[name="is_percentage"]').on("change", function () {
//         updateCurrentAmount();
//     });

//     // Handle discount amount change
//     $("#discountAmount").on("input", function () {
//         updateCurrentAmount();
//     });

//     $(document).on("change", ".percent_discount, .flat_discount", function () {
//         var amount = $(this).val();
//         var cls = $(this).attr("class");
//         console.log($(this).attr('class'));
//         var rowNode = table.row($(this).closest("tr")).node();
//         updateCurrentAmountrow(rowNode, amount, cls);
//         // setTimeout(function () {
//         //     updateCurrentAmountrow(rowNode, amount, cls);
//         // }, 1000);
//     });

//     $("#offerform").submit(function (e) {
//         e.preventDefault();

//         // Get the checked checkboxes
//         var checkedCheckboxes = $(
//             '#example tbody input[type="checkbox"]:checked'
//         );

//         // If no checkboxes are checked, you might want to handle this case or simply return
//         if (checkedCheckboxes.length === 0) {
//             alert("Please select at least one product.");
//             return;
//         }

//         // Create an array to store the data of checked rows
//         var checkedData = [];

//         // Iterate through the checked checkboxes
//         checkedCheckboxes.each(function () {
//             var row = $(this).closest("tr");
//             var rowData = {
//                 product_id: row.find(".checkbox").val(), // Assuming the second column is the product ID
//                 // Add other fields as needed
//                 percent_discount: row.find(".percent_discount").val(),
//                 flat_discount: row.find(".flat_discount").val(),
//                 discounted_price: row.find(".current_price_input").val(),
//                 product_size_id: row.find(".size_id").val(),
//                 product_shade_id: row.find(".shade_id").val(),
//             };
//             checkedData.push(rowData);
//         });

//         // Convert the checkedData array to JSON
//         var checkedDataJson = JSON.stringify(checkedData);

//         // Add a hidden input field to the form and set its value to the JSON data
//         $("<input>")
//             .attr({
//                 type: "hidden",
//                 name: "checked_data",
//                 value: checkedDataJson,
//             })
//             .appendTo("#offerform");

//         // Now submit the form
//         this.submit();
//     });
// });

// var table = $("#example").DataTable();

// // Function to check the checkboxes based on the product IDs array
// function checkProductCheckboxes() {
//     productIds.forEach(function (productId) {
//         // Select the checkbox with the corresponding product ID and check it
//         $('input[type="checkbox"][value="' + productId + '"]').prop(
//             "checked",
//             true
//         );
//     });
// }

// function deliupdateproduct(e, url) {
//     return new Promise((resolve, reject) => {
//         var category_id = $("#category_id").val();
//         var brand_id = $("#brand_id").val();
//         var offer_id = $("#offer_id").val();
//         // console.log(url);
//         $.ajax({
//             url: url,
//             type: "GET",
//             data: {
//                 category_id: category_id,
//                 brand_id: brand_id,
//                 offer_id: offer_id,
//             },
//             success: function (data) {
//                 // Clear existing rows in the table body
//                 // table.clear();

//                 // Get the IDs of checked checkboxes
//                 var checkedIds = $(
//                     '#example tbody input[type="checkbox"]:checked'
//                 )
//                     .map(function () {
//                         return $(this).val();
//                     })
//                     .get();
//                 // Remove rows that are not in the checked list
//                 table
//                     .rows()
//                     .nodes()
//                     .to$()
//                     .each(function () {
//                         var row = table.row($(this));
//                         var productId = row.data()[0]; // Assuming the first column is the product ID

//                         if (checkedIds.indexOf(productId.toString()) === -1) {
//                             row.remove().draw(false);
//                         }
//                     });

//                 // Check if any products are returned
//                 if (data.products.length > 0) {
//                     // Iterate through the products and add rows to the DataTable
//                     $.each(data.products, function (index, product) {
//                         var row = table.row
//                             .add([
//                                 product.id,
//                                 product.name,
//                                 product.price,
//                                 product.discount_amount,
//                                 '<input type="checkbox" name="product_id[]" value="' +
//                                     product.id +
//                                     '"/>',
//                             ])
//                             .draw(false)
//                             .node();
//                     });
//                 } else {
//                     console.log("No products found for the selected category.");
//                     // $('#example tbody').html('<tr><td colspan="100" style="text-align: center;">No data available in this table</td></tr>');
//                 }

//                 resolve();
//             },
//             error: function (xhr, status, error) {
//                 console.error(xhr.responseText);
//                 // Handle errors if any

//                 reject(error);
//             },
//         });
//     });
// }

// function uptoupdateproduct(e, url) {
//     return new Promise((resolve, reject) => {
//         var category_id = $("#category_id").val();
//         var brand_id = $("#brand_id").val();
//         var offer_id = $("#offer_id").val();
//         // console.log(url);
//         $.ajax({
//             url: url,
//             type: "GET",
//             data: {
//                 category_id: category_id,
//                 brand_id: brand_id,
//                 offer_id: offer_id,
//             },
//             success: function (data) {
//                 // Clear existing rows in the table body
//                 // table.clear();
//                 console.log(data);
//                 // Get the IDs of checked checkboxes
//                 var checkedIds = $(
//                     '#example tbody input[type="checkbox"]:checked'
//                 )
//                     .map(function () {
//                         return $(this).val();
//                     })
//                     .get();
//                 // Remove rows that are not in the checked list
//                 table
//                     .rows()
//                     .nodes()
//                     .to$()
//                     .each(function () {
//                         var row = table.row($(this));
//                         var productId = row.data()[1]; // Assuming the first column is the product ID

//                         if (checkedIds.indexOf(productId.toString()) === -1) {
//                             row.remove().draw(false);
//                         }
//                     });

//                 // Check if any products are returned
//                 if (data.products.length > 0) {
//                     // Iterate through the products and add rows to the DataTable
//                     $.each(data.products, function (index, product) {
//                         if (product.product_shades.length > 0) {
//                             $.each(
//                                 product.product_shades,
//                                 function (shadeIndex, productShade) {
//                                     var row = table.row
//                                         .add([
//                                             '<input class="checkbox" type="checkbox" name="product_id[]" value="' +
//                                                 product.id +
//                                                 '"/>',
//                                             product.id,
//                                             product.name,
//                                             productShade.shade.name + '<input type="hidden" class="shade_id" value="'+ productShade.shade_id +'"/>' +'<input type="hidden" class="size_id"/>',
//                                             productShade.shade_price,
//                                             product.discount_amount,
//                                             '<input type="text" class="form-control percent_discount" name="percent_discount[]" value="0.00"/>',
//                                             '<input type="text" class="form-control flat_discount" name="flat_discount[]"  value="0.00" />',
//                                             '<input type="text" class="form-control current_price_input" name="current_price[]"  value="0.00"/>',
//                                         ])
//                                         .draw(false)
//                                         .node();
//                                 }
//                             );
//                         }
//                         else
//                         {
//                             console.log(product.size_id);
//                             if (product.product_sizes.length > 0) {
//                                 $.each(
//                                     product.product_sizes,
//                                     function (sizeIndex, productSize) {
//                                         var row = table.row
//                                             .add([
//                                                 '<input class="checkbox" type="checkbox" name="product_id[]" value="' +
//                                                     product.id +
//                                                     '"/>',
//                                                 product.id,
//                                                 product.name ,
//                                                 productSize.size.name + '<input type="hidden" class="shade_id" />' +'<input type="hidden" class="size_id" value="'+ productSize.size_id +'"/>',
//                                                 productSize.size_price,
//                                                 product.discount_amount,
//                                                 '<input type="text" class="form-control percent_discount" name="percent_discount[]" value="0.00"/>',
//                                                 '<input type="text" class="form-control flat_discount" name="flat_discount[]"  value="0.00" />',
//                                                 '<input type="text" class="form-control current_price_input" name="current_price[]"  value="0.00"/>',
//                                             ])
//                                             .draw(false)
//                                             .node();
//                                     }
//                                 );
//                             }

//                         }
//                     });
//                 } else {
//                     console.log("No products found for the selected category.");
//                     // $('#example tbody').html('<tr><td colspan="100" style="text-align: center;">No data available in this table</td></tr>');
//                 }

//                 resolve();
//             },
//             error: function (xhr, status, error) {
//                 console.error(xhr.responseText);
//                 // Handle errors if any

//                 reject(error);
//             },
//         });
//     });
// }

// // Update the updateCurrentAmount function
// function updateCurrentAmount() {
//     // console.log('working');
//     var discountAmount = parseFloat($("#discountAmount").val()) || 0;
//     var discountType = $('input[name="is_percentage"]:checked').val();

//     table.rows().every(function () {
//         // Use 'node()' to get the TR element
//         var rowNode = this.node();

//         // Use 'data()' to get the data for the row
//         var rowData = this.data();

//         var percentageValue = 0;
//         var currentValue = 0;
//         var exactValue = 0;

//         if (discountType === "1") {
//             // Percentage discount
//             percentageValue = discountAmount;
//             exactValue = (rowData[4] * discountAmount) / 100;
//             currentValue = rowData[4] - exactValue;
//         } else {
//             // Flat discount
//             exactValue = discountAmount;
//             percentageValue = (exactValue * 100) / rowData[4]; // Use rowData[4] for the product price
//             currentValue = rowData[4] - exactValue; // Use rowData[4] for the product price
//         }
//         // console.log(rowData[5]);
//         // Update the HTML content of cells
//         rowData[6] =
//             '<input type="text" class="form-control percent_discount" name="percent_discount[]" value="' +
//             percentageValue.toFixed(2) +
//             '"/>';
//         rowData[7] =
//             '<input type="text" class="form-control flat_discount" name="flat_discount[]" value="' +
//             exactValue.toFixed(2) +
//             '"/>';
//         rowData[8] =
//             '<input type="text" class="form-control current_price_input" readonly name="current_price[]" value="' +
//             currentValue.toFixed(2) +
//             '"/>';

//         // Update the data for the row
//         this.data(rowData).draw(false);
//     });
// }

// //row update
// function updateCurrentAmountrow(row, amount, cls) {
//     // Get the data for the current row
//     var rowData = table.row(row).data();
//     // console.log(rowData[5]);
//     // Get the discount amount and type
//     var discountAmount = amount;
//     // var discountAmount = parseFloat($(rowData[5]).val()) || 0;
//     var discountType;
//     if (cls == "form-control percent_discount" ? (discountType = "1") : (discountType = "0"))
//         console.log(discountType);
//         // Perform calculations based on the discount type
//         var percentageValue = 0;
//     var currentValue = 0;
//     var exactValue = 0;

//     if (discountType == "1") {
//         // Percentage discount
//         percentageValue = discountAmount;
//         exactValue = (rowData[4] * discountAmount) / 100;
//         currentValue = rowData[4] - exactValue;
//     } else {
//         // Flat discount
//         exactValue = discountAmount;
//         percentageValue = (exactValue * 100) / rowData[4]; // Use rowData[4] for the product price
//         currentValue = rowData[4] - exactValue; // Use rowData[4] for the product price
//     }
//     // console.log(rowData[5])
//     console.log(rowData[6])
//     console.log(rowData[7])
//     console.log(rowData[8])
//     // Update the HTML content of cells in the current row
//     if (discountType == "1") {
//         rowData[6] =
//             '<input type="text" class="form-control percent_discount" name="percent_discount[]" value="' +
//             amount +
//             '"/>';
//         rowData[7] =
//             '<input type="text" class="form-control flat_discount" name="flat_discount[]" value="' +
//             exactValue.toFixed(2) +
//             '"/>';
//         rowData[8] =
//             '<input type="text" class="form-control current_price_input" readonly name="current_price[]" value="' +
//             currentValue.toFixed(2) +
//             '"/>';
//     } else {
//         rowData[6] =
//             '<input type="text" class="form-control percent_discount" name="percent_discount[]" value="' +
//             percentageValue.toFixed(2) +
//             '"/>';
//         rowData[7] =
//             '<input type="text" class="form-control flat_discount" name="flat_discount[]" value="' +
//             amount +
//             '"/>';
//         rowData[8] =
//             '<input type="text" class="form-control current_price_input" readonly name="current_price[]" value="' +
//             currentValue.toFixed(2) +
//             '"/>';
//     }

//     // Update the data for the current row
//     table.row(row).data(rowData).draw(false);
// }
