function modifyOptionFromSelect(delta, selectID) {
    var element = document.getElementById(selectID);
    var newValue = parseInt(element.value) + delta;
    if(newValue > 10)
        newValue = 10;
    else if(newValue<0)
        newValue = 0;
    element.value = "" + newValue
}


function roll(diceList) {
    var diceToRoll = diceList.map( (dice) => ({
            name: dice.name,
            numberOfRolls: document.getElementById(dice.name).value}
        )
    );
    showQuery(diceToRoll);
    $.ajax('/roll/' ,{
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            diceToRoll: JSON.stringify(diceToRoll)
        })
     }).then( data =>
        showResult(data)
     ).catch(function(err) {
         $("#rolledResult").empty()
         $("#rolledResult").append("<p>Failed to roll.</p>")
         console.log('fail')
     });
}

function showResult(data) {
    $("#rolledResult").empty();

    let panel = document.createElement('div');
    panel.className = "panel panel-default";

    let panelHeading = document.createElement('div');
    panelHeading.className = "panel-heading";
    panelHeading.appendChild(document.createTextNode("Results: "));
    panel.appendChild(panelHeading);

    let panelBody = document.createElement('div');
    panelBody.className = "panel-body";

    let unorderedlist = document.createElement('ul')
    unorderedlist.className = "list-unstyled row";
    var messageString = "roll: ";
    for(let row of data) {
        let stringToDisplay = row.name + ": " + row.rolledValues[0];
        messageString += row.name + ": " + row.rolledValues[0] + ", ";
        for(let i=1; i<row.rolledValues.length; i++) {
            stringToDisplay += ", " + row.rolledValues[i];
            messageString += row.rolledValues[i] + ", ";
        }
        let listelement = document.createElement('li')
        listelement.appendChild(document.createTextNode(stringToDisplay));
        listelement.className="col-sm-12";
        unorderedlist.appendChild(listelement);
    }
    panelBody.appendChild(unorderedlist)
    panel.appendChild(panelBody);

    $("#rolledResult").append(panel);
    if(emitNewMessageCallback) {
        emitNewMessageCallback(messageString);
    }
}

function showQuery(diceToRoll) {
    $("#rolledQuery").empty();
    diceToRoll = diceToRoll.filter( entry => entry.numberOfRolls>0 );

    let panel = document.createElement('div');
    panel.className = "panel panel-default";

    let panelHeading = document.createElement('div');
    panelHeading.className = "panel-heading";
    panelHeading.appendChild(document.createTextNode("Query: "));
    panel.appendChild(panelHeading);

    let panelBody = document.createElement('div');
    panelBody.className = "panel-body";

    let unorderedlist = document.createElement('ul')
    unorderedlist.className = "list-unstyled row"
    for(let row of diceToRoll) {
        let stringToDisplay = row.numberOfRolls + " x " + row.name;
        let listelement = document.createElement('li')
        listelement.appendChild(document.createTextNode(stringToDisplay));
        listelement.className="col-sm-12";
        unorderedlist.appendChild(listelement);
    }
    panelBody.appendChild(unorderedlist)
    panel.appendChild(panelBody);

    $("#rolledQuery").append(panel)
}

function reset() {
    $("#rolledResult").empty();
    $("#rolledQuery").empty();    
}