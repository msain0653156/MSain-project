function calculateTotal() {

    // get room price with drop down menu
    var room = document.getElementById("room").value;

    // number of nights
    var nights = document.getElementById("nights").value;

    // changes nights to an int
    nights = parseInt(nights);

    // Start the total with room price times number of nights.
    var total = room * nights;

    // Add the cost of breakfast if it is checked.
    if (document.getElementById("breakfast").checked) {
        total = total + 20;
    }

    // Add the cost of parking if it is checked.
    if (document.getElementById("parking").checked) {
        total = total + 15;
    }

    // Add the cost of spa access if it is checked.
    if (document.getElementById("spa").checked) {
        total = total + 50;
    }

    // Add the cost of the guided tour if it is checked.
    if (document.getElementById("tour").checked) {
        total = total + 40;
    }

    // Calculate 10% tax.
    var tax = total * 0.10;

    // Add tax to the final total.
    total = total + tax;

    // Show the total cost on the page.
    document.getElementById("result").innerHTML = "Total Cost: $" + total.toFixed(2);
}
