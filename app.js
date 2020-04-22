var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id,
            this.description = description
        this.value = value
    };

    var Income = function (id, description, value) {
        this.id = id,
            this.description = description
        this.value = value
    };



    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    };

    return {

        testing: function()
        {
            console.log(data.allItems)
        },


        additem: function (type, des, val) {
            var newItem, ID;

            //new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //create new item if its exp or inc
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            //push the data into data structure
            data.allItems[type].push(newItem)


            //return new item
            return newItem
        }

    };


})();


var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'

    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },


        getDomStrings: function () {
            return DOMStrings;
        }
    }
})();


//GLOBAL APP CONTROLLER
var controller = (function (bdgtCTRL, UICtrl) {

    var setUpEventListeners = function () {
        var DOM = UICtrl.getDomStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)


        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 1 || event.which == 13)
                ctrlAddItem();


        })
    }


    var ctrlAddItem = function () {
        console.log('it works')

        var input, newItem;
        //1. get the field input data
        var input = UIController.getInput();

        //2. add item to budget controller
        var newItem = bdgtCTRL.additem(input.type, input.description, input.value)
        //3. add new titem to UI

        //4. calc budget
        // on git read-input
        //5. display budget on the UI
    };

    return {
        init: function () {
            console.log('Application running')
            setUpEventListeners();
        }
    }


})(budgetController, UIController);


controller.init();
