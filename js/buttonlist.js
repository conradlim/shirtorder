Pullover=new Array("Select Size","XSmall","Small","Medium","Large","Large Tall","XLarge","XLargeTall","2XL","2XLTall","3XL","3XLTall","4XL","5XL");
Button=new Array("Select Sizess","XSmall","Small","Medium","Large","Large Tall","XLarge","XLargeTall","2XL","2XLTall","3XL","3XLTall","4XL","5XL");
Select = new Array("--")

var _ddlType = document.getElementById("ddlType")
populateSelect();
 
$(function() {

    $('#ddlType').change(function () {
        populateSelect();
    });
    
});


function populateSelect() {
    shirtstyle = _ddlType.value
    console.log(shirtstyle)
    //shirtstyle = $('#ddlType').val();    
    $('#ddlSize').html('');
    
       eval(shirtstyle).forEach(function(t) { 
           $('#ddlSize').append('<option value="'+t+'">' + t + '</option>');
        });
    };
    