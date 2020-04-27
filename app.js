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


    // how line 20 and 21 works. you are saying goto data then goto allitems then goto whatever type is specifified. then go through each 
    //element in the array 'for each' and with each element perform the function and (cur) is just a placeholder but the  function below
    //takes the current value and adds it to sum, the current value in the array is now in (cur) and it does that for every element in the array exp or inc under all items. depending on what type will be used.
    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum = sum + cur.value;
        })
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1

    };

    return {

        testing: function () {
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
        },
        calculateBudget: function () {

            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //calcualte the budget : income - expenses

            data.budget = data.totals.inc - data.totals.exp
            //calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            } else
                data.percentage = -1;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }

        }

    };


})();


var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'

    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHTML;
            //create hTML strings with palceholder
            if (type === 'inc') {
                element = DOMStrings.incomeContainer
                html = '<div class="item clearfix" id="income-%ID%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //replace the placeholder text with some actual data
            newHTML = html.replace('%id', obj.id)
            newHTML = newHTML.replace('%description%', obj.description)
            newHTML = newHTML.replace('%value%', obj.value)
            //insert the html into the dom

            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)

        },

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            })

            fieldsArr[0].focus();
        },


        displayBudget: function(obj)
        {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp
            
            
            if (obj.percentage>0)
                {
                    document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'
                }
            else
                {
                    document.querySelector(DOMStrings.percentageLabel).textContent = '---'
                }
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

    var updateBudget = function () {
        //calculate the budget
        bdgtCTRL.calculateBudget();

        // return the budget
        var budget = bdgtCTRL.getBudget();
        //display the budget on the ui
console.log(budget)
        UICtrl.displayBudget(budget)
    }
    var ctrlAddItem = function () {
        console.log('it works')

        var input, newItem;
        //1. get the field input data
        var input = UIController.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. add item to budget controller
            var newItem = bdgtCTRL.additem(input.type, input.description, input.value)
            //3. add new titem to UI
            UICtrl.addListItem(newItem, input.type)

            //clear the fields
            UICtrl.clearFields();
            //4. calc budget

            updateBudget()
        }
        // on git read-input
        //5. display budget on the UI
    };



    return {
        init: function () {
            console.log('Application running')
            setUpEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
        }
    }


})(budgetController, UIController);


controller.init();
