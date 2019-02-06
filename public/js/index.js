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
    $.ajax('/roll/' ,{
        method: 'POST',
        data: {
            diceToRoll: JSON.stringify(diceToRoll)
        }
     }).then( data =>
        showResult(data)
     ).catch(function(err) {
         $("#rolledResult").empty()
         $("#rolledResult").append("<p>Failed to roll.</p>")
         console.log('fail')
     });
}

function showResult(data) {
    $("#rolledResult").empty()
    console.log(JSON.stringify(data))
    var _table_ = document.createElement('table'),
        _tr_ = document.createElement('tr'),
        _td_ = document.createElement('td');

        // ul.list-unstyled.row
        // each dice in diceList
        //     li.col-sm-6

    var table = _table_.cloneNode(false);
    for(let row of data) {
        var tr = _tr_.cloneNode(false);
        let td_left = _td_.cloneNode(false);
        td_left.appendChild(document.createTextNode(row.name));
        let td_right = _td_.cloneNode(false);
        let rollsString = "" + row.rolledValues[0];
        for(let i=1; i<row.rolledValues.length; i++) {
            rollsString += ", " + row.rolledValues[i];
        }
        td_right.appendChild(document.createTextNode(rollsString));
        tr.appendChild(td_left);
        tr.appendChild(td_right);
        table.appendChild(tr);
    }

    let resultElement = 
    $("#rolledResult").append(table)
}