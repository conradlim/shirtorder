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
        if (cartItems == 0 || cartItems == null ) {
            clearOnLoad()           
        }
    }

    if (totalCount == 7) {
        btnAlternate.disabled = ''
        btnAdd.disabled = 'disabled'
        console.log("alternateOn")
    } else if (totalCount < 7) {
        btnAlternate.disabled = 'disabled'
        btnAdd.disabled = ''
    } else if (alternateCount == 2) {
        btnAdd.disabled = 'disabled'
        btnAlternate.disabled = 'disabled'
    }else if (alternateCount <2) {
        btnAlternate.disabled = ''
        btnAdd.disabled = 'disabled'
    }

    //if (alternateCount == 2) {
    //    btnAdd.disabled = 'disabled'
    //    btnAlternate.disabled = 'disabled'
    //} else {
    //    btnAlternate.disabled = ''
    //}

}

//Shirt obj array
var countDiv = document.getElementById("showCount")
var shirtCart = []
var alternateCart = []

//shirt constructor
var ShirtItem = function shirtItem(id, name, size, color, type, count) {
    this.id = id
    this.name = name
    this.size = size
    this.color = color
    this.type = type
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
function addToAlternate(ids){
    var id = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-id')
    var name = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-style')
    var size = _ddlSize.options[_ddlSize.selectedIndex].getAttribute('value')
    var color = _ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-color')
    var type = _ddlType.options[_ddlType.selectedIndex].getAttribute('data-type')
    var count = parseInt(_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-count'))

    var item = new ShirtItem(id, name, size, color, type, count)
    if (alternateCart.length < 2) {
        for (var i in shirtCart) {
            if (shirtCart[i].id === id && shirtCart[i].color === color) {
                cartAlert(name + " Already in cart. <br> Please choose a different alternate")
                return false
            }           
        }
        for (var j in alternateCart) {
            if (alternateCart[j].id === id && alternateCart[j].color === color) {
                cartAlert(name + " Already in cart. <br> Please choose a different alternate")
                return false
            }
        }
        var item = new ShirtItem(id, name, size, color, type, count)
        alternateCart.push(item)
        cartAlert("")
        saveAlternateCart()
    }
    if (alternateCart.length == 2) {
        cartAlert("Quantities met.  Please confirm your selection")
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
    var count = parseInt(_ddlStyle.options[_ddlStyle.selectedIndex].getAttribute('data-count'))

    var item = new ShirtItem(id, name, size, color, type, count)
    if (shirtCart.length < 7) {
        for (var i in shirtCart) {
            if (shirtCart[i].id === id && shirtCart[i].color === color && shirtCart[i].size === size) {
                cartAlert(color + " - " + name + " Already In Cart")
                return false
            }
        }
        var item = new ShirtItem(id, name, size, color, type, count)
        shirtCart.push(item)
        cartAlert("")
        saveCart()
       // console.log("Shirt " + item.type + " " + item.name + " added successfully")
       // console.log(shirtCart.length)
    }
    if (shirtCart.length == 7) {
        cartAlert("Limited To 7 Shirts. <br> Please select 2 alternatives.")
        btnAlternate.disabled = ''
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
    //return "Cart Total: " +totalCount
    countDiv.innerHTML = totalCount
    return totalCount
}
function alternateCount() {
    var extraCount = 0
    for (var i in alternateCart) {
        extraCount += alternateCart[i].count

    }
    //return "Cart Total: " +totalCount
    //countDiv.innerHTML = totalCount
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
    console.log(alternateCart)

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
    header[5] = "QUANTITY"
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
            html += "<td>" + alternateCart[i].count + "</td>";
            html += "</tr>";
        }
        html += ""
        html += "</table>";
        tableDivTwo.innerHTML = html;
    }


}




//function showCartitems() {
   
//    shirtCart = JSON.parse(localStorage.getItem("CartItems"))
//    alternateCart = JSON.parse(localStorage.getItem("AlternateItems"))
//    console.log(alternateCart)
//    count = 1
//    var tableDiv = document.getElementById("tblDiv")
//    var tableOne = document.createElement("TABLE")
//    var tableBody = document.createElement('TBODY')
//    var header = new Array()
//    header[0] = ""
//    header[1] = "STYLE"
//    header[2] = "COLOR"
//    header[3] = "SIZE"
//    header[4] = "TYPE"
//    header[5] = "QUANTITY"
//    tableOne.appendChild(tableBody)

//    var html = "<table id='itemsInCart' style='border:1px solid whitesmoke;border-collapse:collapse;text-align:center'>";

//    for (var i = 0; i < header.length; i++) {
//        html += "<th style='padding-left:10px'>"
//        html += header[i] + "</th>"
//    }
//    for (var i = 0; i < shirtCart.length; i++) {
//        html += "<tr>";
//        html += "<td>" + "<button id='deleteItem' href='#' onclick='return removeItem(this)' data-id='" + shirtCart[i].id + "' data-color='" + shirtCart[i].color + "'>DELETE</button></td>";
//        html += "<td>" + shirtCart[i].name + "</td>";
//        html += "<td>" + shirtCart[i].color + "</td>";
//        html += "<td>" + shirtCart[i].size + "</td>";
//        html += "<td>" + shirtCart[i].type + "</td>";
//        html += "<td>" + shirtCart[i].count + "</td>";
//        html += "</tr>";
//    }
//    html += "</table>";
//    tableDiv.innerHTML = html;
//}














//$("#previousbutton").click(function () {
//    $("#form_sub_container1").show();
//    $("#form_sub_container2").hide();
//})

//$("#nextbutton").click(function () {
//    $("#form_container").find(":hidden").show().next();
//    $("#form_sub_container1").hide();
//})
