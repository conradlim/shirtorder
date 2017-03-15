var msgArea = document.getElementById('cartMessages')
var msgDiv = document.getElementById('messageDiv')
var msgTxt = document.getElementById('cartMessages')
var btnAlternate = document.getElementById('btnAlternate')
var btnAdd = document.getElementById('btnAdd')

var _ddlStyle = document.getElementById("ddlStyle")
var _ddlColor = document.getElementById("ddlColor")
var _ddlSize = document.getElementById("ddlSize")
var _ddlType = document.getElementById("ddlType")

window.onload = function () {

    var storageItems = loadCart()
    var alternateStorage = loadAlternate()
    alternateCount = alternateCount()
    totalCount = cartCount()
    if (storageItems == null || shirtCart == "undefined" || alternateStorage == null || alternateCart == "undefined") {
        cartItems = shirtCart
        alternateItems = alternateCart
        if (cartItems == 0 || cartItems == null) {
            clearOnLoad()
        } else if (_ddlType != null) {
            if (cartItems[0].type.length > 0) {
                var shirtType = cartItems[0].type
                var shirtS = cartItems[0].size
                for (var i = 0; i < _ddlType.options.length; i++) {
                    if (_ddlType.options[i].text == shirtType) {
                        _ddlType.selectedIndex = i;
                        populateSelectOnLoad();
                        break;
                    }
                }
                for (var j = 0; j < _ddlSize.options.length; j++) {
                    if (_ddlSize.options[j].text == shirtS) {
                        _ddlSize.selectedIndex = j;
                        break;
                    }
                }
                _ddlType.disabled = 'disabled'
                _ddlType.style.backgroundColor = "lightgray"
                _ddlSize.disabled = 'disabled'
                _ddlSize.style.backgroundColor = 'lightgray'

            }
        }
    }


    if (btnAlternate != null || btnAdd != null) {
        if (totalCount == 7) {
            btnAlternate.disabled = ''
            btnAdd.disabled = 'disabled'

        } else if (totalCount < 7) {
            btnAlternate.disabled = 'disabled'
            btnAdd.disabled = ''
        } else if (alternateCount == 2) {
            btnAdd.disabled = 'disabled'
            btnAlternate.disabled = 'disabled'
        } else if (alternateCount < 2) {
            btnAlternate.disabled = ''
            btnAdd.disabled = 'disabled'
        }
    }
}

//Shirt obj array
var countDiv = document.getElementById("showCount")
var shirtCart = []
var alternateCart = []

//shirt constructor
var ShirtItem = function shirtItem(id, name, size, color, type, gender, count) {
    this.id = id
    this.name = name
    this.size = size
    this.color = color
    this.type = type
    this.gender = gender
    this.count = count
}

//Validate dropdownlists index > 0
function checkDropList() {
    var e = document.getElementsByClassName('ddList')
    for (var i = 0; i < e.length ; i++) {
        var currentDdl = e[i]
        currentDdl.style.border = ""
        msgDiv.style.backgroundColor = ""
        msgTxt.style.color = 'darkred'
        if (currentDdl.selectedIndex == 0) {
            cartAlert("Please select a " + e[i].name)
            e[i].focus()
            currentDdl.style.border = "1px solid darkred"
            msgDiv.style.backgroundColor = "darkred"
            msgTxt.style.color = '#fff'
            return false
        }
    }
    if (btnAdd.disabled == false) {
        addItemToCart(this)
    } else {
        addToAlternate(this)
    }

}

//Add items in AlternateCart
function addToAlternate(ids) {
    var id = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-id')
    var name = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-style')
    var size = _ddlSize.options[_ddlSize.selectedIndex].getAttribute('value')
    var color = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-color')
    var type = _ddlType.options[_ddlType.selectedIndex].getAttribute('data-type')
    var gender = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-gender')
    var count = parseInt(_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-count'))

    var item = new ShirtItem(id, name, size, color, type, gender, count)

    if (alternateCart.length < 3) {
        for (var i in shirtCart) {
            if (shirtCart[i].id === id && shirtCart[i].color === color) {
                cartAlert(name + " Already in cart. <br> Please choose a different alternate")
                return false
            }
        }
        for (var j in alternateCart) {
            if (alternateCart[j].id === id && alternateCart[j].color === color) {
                cartAlert(color + " - " +name + " Already in cart. <br> Please choose a different alternate")
                return false
            }
        }
        var item = new ShirtItem(id, name, size, color, type, gender, count)
        alternateCart.push(item)
        cartAlert(color+ " "+ name + " Alternate Saved")
        saveAlternateCart()
    }
    if (alternateCart.length == 3) {
        cartAlert("<a href='tj_ShoppingCart.html' style='color:white'>Quantities met.  Please confirm your selection</a>")
        btnAlternate.disabled = 'disabled'
        btnAdd.disabled = 'disabled'
        msgDiv.style.backgroundColor = "darkred"
        msgTxt.style.color = '#fff'
        return false
    }
}


// Add items to shirtCart array function
function addItemToCart(ids) {
    var id = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-id')
    var name = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-style')
    var size = _ddlSize.options[_ddlSize.selectedIndex].getAttribute('value')
    var color = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-color')
    var type = _ddlType.options[_ddlType.selectedIndex].getAttribute('data-type')
    var gender = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-gender')
    var count = parseInt(_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-count'))

    var item = new ShirtItem(id, name, size, color, type, count)

    if (shirtCart.length < 7) {
        for (var i in shirtCart) {
            if (shirtCart[i].id === id && shirtCart[i].color === color && shirtCart[i].size === size) {
                cartAlert(color + " - " + name + " Already In Cart")
                return false
            }
        }
        var item = new ShirtItem(id, name, size, color, type, gender, count)
        _ddlType.disabled = 'disabled'
        _ddlType.style.backgroundColor = 'lightgray'
        _ddlSize.disabled = 'disabled'
        _ddlSize.style.backgroundColor = 'lightgray'
        shirtCart.push(item)
        cartAlert(color+"-"+name+" Saved")
        console.log("weaddup")
        saveCart()

    }
    if (shirtCart.length == 7) {
        cartAlert("Limited To 7 Shirts. <br> Please select 3 alternatives.")
        btnAlternate.disabled = ''
        btnAlternate.style.border='1.5px solid darkred'
        btnAlternate.style.font='darkred'
        btnAdd.disabled = 'disabled'
        msgDiv.style.backgroundColor = "darkred"
        msgTxt.style.color = '#fff'
        return false
    }
}

//Remove an item from cart function
function removeItem(ids) {
    var id = ids.getAttribute('data-id')
    var color = ids.getAttribute('data-color')
    for (var i in shirtCart) {
        if (shirtCart[i].id === id && shirtCart[i].color === color) {
            shirtCart.splice(i, 1)
            cartAlert("Shirt Removed")
            saveCart()
            showCartitems()
            break
        }
    }
}

function removeAlternateItem(ids) {
    var id = ids.getAttribute('data-id')
    var color = ids.getAttribute('data-color')
    for (var i in alternateCart) {
        if (alternateCart[i].id === id && alternateCart[i].color === color) {
            alternateCart.splice(i, 1)
            cartAlert("Shirt Removed")
            saveAlternateCart()
            showCartitems()
            break
        }
    }
}

//Site error messages
function cartAlert(msg) {
    var currentCount = cartCount()
    msgTxt.innerHTML = ""

    countDiv.innerHTML = currentCount
    if (currentCount >= 0) {
        msgTxt.innerHTML = msg
    }
}

//Clear ALL items onLoad
function clearOnLoad() {
    shirtCart = []
    alternateCart = []
    saveCart()
    saveAlternateCart()
    cartCount()
}

//Clear ALL onClick
function clearCart() {
    clearOnLoad()
    cartAlert("Cart Cleared")
    showCartitems()

}


//Return item count in cart function 
function cartCount() {
    var totalCount = 0
    for (var i in shirtCart) {
        totalCount += shirtCart[i].count
    }
    countDiv.innerHTML = totalCount
    return totalCount
}
function alternateCount() {
    var extraCount = 0
    for (var i in alternateCart) {
        extraCount += alternateCart[i].count
    }
    return extraCount
}


//List items from cart (shirtCart array)
function listItems() {
    var copyCart = []
    for (var i in shirtCart) {
        var item = shirtCart[i]
        var itemCopy = {}
        for (var p in item) {
            itemCopy[p] = item[p]
        }
        copyCart.push(itemCopy)
    }
    return copyCart
}


//Save items to local storage
function saveCart() {
    localStorage.setItem("CartItems", JSON.stringify(shirtCart))

    console.log("Cart Saved")
}
function saveAlternateCart() {
    localStorage.setItem("AlternateItems", JSON.stringify(alternateCart))
    console.log("Alternate Saved")
}


//Load items from Cart -- returned from local storage
function loadCart() {
    shirtCart = JSON.parse(localStorage.getItem("CartItems"))
}

function loadAlternate() {
    alternateCart = JSON.parse(localStorage.getItem("AlternateItems"))

}

function showCartitems() {
    shirtCart = JSON.parse(localStorage.getItem("CartItems"))
    alternateCart = JSON.parse(localStorage.getItem("AlternateItems"))

    count = 1
    var tableDiv = document.getElementById("tblDiv")
    var tableOne = document.createElement("TABLE")
    var tableBody = document.createElement('TBODY')
    var header = new Array()
    header[0] = ""
    header[1] = "STYLE"
    header[2] = "COLOR"
    header[3] = "SIZE"
    header[4] = "TYPE"
    header[5] = "M/W"
    header[6] = "QUANTITY"
    tableOne.appendChild(tableBody)

    var html = "<table id='itemsInCart' style='border:1px solid gray;border-collapse:collapse;text-align:center'>";

    for (var i = 0; i < header.length; i++) {
        html += "<th style='padding:10px 50px'>"
        html += header[i] + "</th>"
    }
    for (var i = 0; i < shirtCart.length; i++) {
        html += "<tr>";
        html += "<td>" + "<button id='deleteItem' class='glyphicon glyphicon-remove' style='border-radius:5px;border:1px solid #f5f5f5;' href='#' onclick='return removeItem(this)' data-id='" + shirtCart[i].id + "' data-color='" + shirtCart[i].color + "'></button></td>";
        html += "<td>" + shirtCart[i].name + "</td>";
        html += "<td>" + shirtCart[i].color + "</td>";
        html += "<td>" + shirtCart[i].size + "</td>";
        html += "<td>" + shirtCart[i].type + "</td>";
        html += "<td>" + shirtCart[i].gender + "</td>"
        html += "<td>" + shirtCart[i].count + "</td>";
        html += "</tr>";
    }
    html += ""
    html += "</table>";
    tableDiv.innerHTML = html;

    if (alternateCart.length >= 0) {
        var tableDivTwo = document.getElementById("tblAlternateDiv")
        var tableTwo = document.createElement("TABLE")
        var tableBodyTwo = document.createElement('TBODY')
        tableTwo.appendChild(tableBodyTwo)
        var html = "<table id='itemsInCartTwo' style='border:1px solid gray;border-collapse:collapse;text-align:center'>";

        for (var i = 0; i < header.length; i++) {
            html += "<th style='padding:10px 50px'>"
            html += header[i] + "</th>"
        }
        for (var i = 0; i < alternateCart.length; i++) {
            html += "<tr>";
            html += "<td>" + "<button id='deleteItem' class='glyphicon glyphicon-remove' style='border-radius:5px;border:1px solid #f5f5f5;' href='#' onclick='return removeAlternateItem(this)' data-id='" + alternateCart[i].id + "' data-color='" + alternateCart[i].color + "'></button></td>";
            html += "<td>" + alternateCart[i].name + "</td>";
            html += "<td>" + alternateCart[i].color + "</td>";
            html += "<td>" + alternateCart[i].size + "</td>";
            html += "<td>" + alternateCart[i].type + "</td>";
            html += "<td>" + alternateCart[i].gender + "</td>"
            html += "<td>" + alternateCart[i].count + "</td>";
            html += "</tr>";
        }
        html += ""
        html += "</table>";
        tableDivTwo.innerHTML = html;
    }
}

//         Populate Size List Based on Pullover/Button DDL Selection //
//mens
Pullover = new Array("Pullover Sizes", "XS", "SM", "MED", "LG", "LG-T", "XL", "XL-T", "2XL", "2XL-T", "3XL", "3XL-T", "4XL", "5XL");
Button = new Array("Button Sizes", "XS", "SM", "MED", "LG", "LG-T", "XL", "XL-T", "2XL", "2XL-T", "3XL", "3XL-T", "4XL", "5XL");

//womens
Pullovers = new Array("Pullover Sizes", "XXS", "XS", "SM", "MED", "LG", "XL", "2XL");
Buttons = new Array("Button Sizes", "XXS", "XS", "SM", "MED", "LG", "XL", "2XL", "3XL");
Select = new Array("--")

var _ddlType = document.getElementById("ddlType")

$(function () {
    $('#ddlType').change(function () {
        populateSelect();
    });
});
function populateSelect() {
    shirtstyle = _ddlType.value
    $('#ddlSize').html('');
    eval(shirtstyle).forEach(function (t) {
        $('#ddlSize').append('<option value="' + t + '">' + t + '</option>');
    });
};
function populateSelectOnLoad() {
    shirtStyle = shirtCart[0].type
    $('#ddlSize').html('');
    eval(shirtStyle).forEach(function (t) {
        $('#ddlSize').append('<option value="' + t + '">' + t + '</option>');
    })
}


























function checkDropList(){for(var a=document.getElementsByClassName("ddList"),b=0;b<a.length;b++){var c=a[b];if(c.style.border="",msgDiv.style.backgroundColor="",msgTxt.style.color="darkred",0==c.selectedIndex)return cartAlert("Please select a "+a[b].name),a[b].focus(),c.style.border="1px solid darkred",msgDiv.style.backgroundColor="darkred",msgTxt.style.color="#fff",!1}0==btnAdd.disabled?addItemToCart(this):addToAlternate(this)}function addToAlternate(a){var b=_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-id"),c=_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-style"),d=_ddlSize.options[_ddlSize.selectedIndex].getAttribute("value"),e=_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-color"),f=_ddlType.options[_ddlType.selectedIndex].getAttribute("data-type"),g=_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-gender"),h=parseInt(_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-count")),i=new ShirtItem(b,c,d,e,f,g,h);if(alternateCart.length<3){for(var j in shirtCart)if(shirtCart[j].id===b&&shirtCart[j].color===e)return cartAlert(c+" Already in cart. <br> Please choose a different alternate"),!1;for(var k in alternateCart)if(alternateCart[k].id===b&&alternateCart[k].color===e)return cartAlert(c+" Already in cart. <br> Please choose a different alternate"),!1;var i=new ShirtItem(b,c,d,e,f,g,h);alternateCart.push(i),cartAlert(e+" "+c+" Alternate Saved"),saveAlternateCart()}if(3==alternateCart.length)return cartAlert("<a href='tj_ShoppingCart.html' style='color:white'>Quantities met.  Please confirm your selection</a>"),btnAlternate.disabled="disabled",btnAdd.disabled="disabled",msgDiv.style.backgroundColor="darkred",msgTxt.style.color="#fff",!1}function addItemToCart(a){var b=_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-id"),c=_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-style"),d=_ddlSize.options[_ddlSize.selectedIndex].getAttribute("value"),e=_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-color"),f=_ddlType.options[_ddlType.selectedIndex].getAttribute("data-type"),g=_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-gender"),h=parseInt(_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute("data-count")),i=new ShirtItem(b,c,d,e,f,h);if(shirtCart.length<7){for(var j in shirtCart)if(shirtCart[j].id===b&&shirtCart[j].color===e&&shirtCart[j].size===d)return cartAlert(e+" - "+c+" Already In Cart"),!1;var i=new ShirtItem(b,c,d,e,f,g,h);_ddlType.disabled="disabled",_ddlType.style.backgroundColor="lightgray",_ddlSize.disabled="disabled",_ddlSize.style.backgroundColor="lightgray",shirtCart.push(i),cartAlert(""),saveCart()}if(7==shirtCart.length)return cartAlert("Limited To 7 Shirts. <br> Please select 3 alternatives."),btnAlternate.disabled="",btnAlternate.style.border="1.5px solid darkred",btnAlternate.style.font="darkred",btnAdd.disabled="disabled",msgDiv.style.backgroundColor="darkred",msgTxt.style.color="#fff",!1}function removeItem(a){var b=a.getAttribute("data-id"),c=a.getAttribute("data-color");for(var d in shirtCart)if(shirtCart[d].id===b&&shirtCart[d].color===c){shirtCart.splice(d,1),cartAlert("Shirt Removed"),saveCart(),showCartitems();break}}function removeAlternateItem(a){var b=a.getAttribute("data-id"),c=a.getAttribute("data-color");for(var d in alternateCart)if(alternateCart[d].id===b&&alternateCart[d].color===c){alternateCart.splice(d,1),cartAlert("Shirt Removed"),saveAlternateCart(),showCartitems();break}}function cartAlert(a){var b=cartCount();msgTxt.innerHTML="",countDiv.innerHTML=b,b>=0&&(msgTxt.innerHTML=a)}function clearOnLoad(){shirtCart=[],alternateCart=[],saveCart(),saveAlternateCart(),cartCount()}function clearCart(){clearOnLoad(),cartAlert("Cart Cleared"),showCartitems()}function cartCount(){var a=0;for(var b in shirtCart)a+=shirtCart[b].count;return countDiv.innerHTML=a,a}function alternateCount(){var a=0;for(var b in alternateCart)a+=alternateCart[b].count;return a}function listItems(){var a=[];for(var b in shirtCart){var c=shirtCart[b],d={};for(var e in c)d[e]=c[e];a.push(d)}return a}function saveCart(){localStorage.setItem("CartItems",JSON.stringify(shirtCart)),console.log("Cart Saved")}function saveAlternateCart(){localStorage.setItem("AlternateItems",JSON.stringify(alternateCart)),console.log("Alternate Saved")}function loadCart(){shirtCart=JSON.parse(localStorage.getItem("CartItems"))}function loadAlternate(){alternateCart=JSON.parse(localStorage.getItem("AlternateItems"))}function showCartitems(){shirtCart=JSON.parse(localStorage.getItem("CartItems")),alternateCart=JSON.parse(localStorage.getItem("AlternateItems")),count=1;var a=document.getElementById("tblDiv"),b=document.createElement("TABLE"),c=document.createElement("TBODY"),d=new Array;d[0]="",d[1]="STYLE",d[2]="COLOR",d[3]="SIZE",d[4]="TYPE",d[5]="M/W",d[6]="QUANTITY",b.appendChild(c);for(var e="<table id='itemsInCart' style='border:1px solid gray;border-collapse:collapse;text-align:center'>",f=0;f<d.length;f++)e+="<th style='padding:10px 50px'>",e+=d[f]+"</th>";for(var f=0;f<shirtCart.length;f++)e+="<tr>",e+="<td><button id='deleteItem' class='glyphicon glyphicon-remove' style='border-radius:5px;border:1px solid #f5f5f5;' href='#' onclick='return removeItem(this)' data-id='"+shirtCart[f].id+"' data-color='"+shirtCart[f].color+"'></button></td>",e+="<td>"+shirtCart[f].name+"</td>",e+="<td>"+shirtCart[f].color+"</td>",e+="<td>"+shirtCart[f].size+"</td>",e+="<td>"+shirtCart[f].type+"</td>",e+="<td>"+shirtCart[f].gender+"</td>",e+="<td>"+shirtCart[f].count+"</td>",e+="</tr>";if(e+="",e+="</table>",a.innerHTML=e,alternateCart.length>=0){var g=document.getElementById("tblAlternateDiv"),h=document.createElement("TABLE"),i=document.createElement("TBODY");h.appendChild(i);for(var e="<table id='itemsInCartTwo' style='border:1px solid gray;border-collapse:collapse;text-align:center'>",f=0;f<d.length;f++)e+="<th style='padding:10px 50px'>",e+=d[f]+"</th>";for(var f=0;f<alternateCart.length;f++)e+="<tr>",e+="<td><button id='deleteItem' class='glyphicon glyphicon-remove' style='border-radius:5px;border:1px solid #f5f5f5;' href='#' onclick='return removeAlternateItem(this)' data-id='"+alternateCart[f].id+"' data-color='"+alternateCart[f].color+"'></button></td>",e+="<td>"+alternateCart[f].name+"</td>",e+="<td>"+alternateCart[f].color+"</td>",e+="<td>"+alternateCart[f].size+"</td>",e+="<td>"+alternateCart[f].type+"</td>",e+="<td>"+alternateCart[f].gender+"</td>",e+="<td>"+alternateCart[f].count+"</td>",e+="</tr>";e+="",e+="</table>",g.innerHTML=e}}function populateSelect(){shirtstyle=_ddlType.value,$("#ddlSize").html(""),eval(shirtstyle).forEach(function(a){$("#ddlSize").append('<option value="'+a+'">'+a+"</option>")})}function populateSelectOnLoad(){shirtStyle=shirtCart[0].type,$("#ddlSize").html(""),eval(shirtStyle).forEach(function(a){$("#ddlSize").append('<option value="'+a+'">'+a+"</option>")})}var msgArea=document.getElementById("cartMessages"),msgDiv=document.getElementById("messageDiv"),msgTxt=document.getElementById("cartMessages"),btnAlternate=document.getElementById("btnAlternate"),btnAdd=document.getElementById("btnAdd"),_ddlStyle=document.getElementById("ddlStyle"),_ddlColor=document.getElementById("ddlColor"),_ddlSize=document.getElementById("ddlSize"),_ddlType=document.getElementById("ddlType");window.onload=function(){var a=loadCart(),b=loadAlternate();if(alternateCount=alternateCount(),totalCount=cartCount(),null==a||"undefined"==shirtCart||null==b||"undefined"==alternateCart)if(cartItems=shirtCart,alternateItems=alternateCart,0==cartItems||null==cartItems)clearOnLoad();else if(null!=_ddlType&&cartItems[0].type.length>0){for(var c=cartItems[0].type,d=cartItems[0].size,e=0;e<_ddlType.options.length;e++)if(_ddlType.options[e].text==c){_ddlType.selectedIndex=e,populateSelectOnLoad();break}for(var f=0;f<_ddlSize.options.length;f++)if(_ddlSize.options[f].text==d){_ddlSize.selectedIndex=f;break}_ddlType.disabled="disabled",_ddlType.style.backgroundColor="lightgray",_ddlSize.disabled="disabled",_ddlSize.style.backgroundColor="lightgray"}null==btnAlternate&&null==btnAdd||(7==totalCount?(btnAlternate.disabled="",btnAdd.disabled="disabled"):totalCount<7?(btnAlternate.disabled="disabled",btnAdd.disabled=""):2==alternateCount?(btnAdd.disabled="disabled",btnAlternate.disabled="disabled"):alternateCount<2&&(btnAlternate.disabled="",btnAdd.disabled="disabled"))};var countDiv=document.getElementById("showCount"),shirtCart=[],alternateCart=[],ShirtItem=function(b,c,d,e,f,g,h){this.id=b,this.name=c,this.size=d,this.color=e,this.type=f,this.gender=g,this.count=h};Pullover=new Array("Pullover Sizes","XS","SM","MED","LG","LG-T","XL","XL-T","2XL","2XL-T","3XL","3XL-T","4XL","5XL"),Button=new Array("Button Sizes","XS","SM","MED","LG","LG-T","XL","XL-T","2XL","2XL-T","3XL","3XL-T","4XL","5XL"),Pullovers=new Array("Pullover Sizes","XXS","XS","SM","MED","LG","XL","2XL"),Buttons=new Array("Button Sizes","XXS","XS","SM","MED","LG","XL","2XL","3XL"),Select=new Array("--");var _ddlType=document.getElementById("ddlType");$(function(){$("#ddlType").change(function(){populateSelect()})});










