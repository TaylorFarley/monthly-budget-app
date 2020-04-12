
var budgetController = (function() {
    
//some code 
    
})();


var UIController = (function()
{
 var DOMStrings = {
     inputType: '.add__type',
     inputDescription: '.add__description',
     inputValue: '.add__value',
     inputBtn: '.add__btn'
     
 }
    
    
return {
  getInput: function() 
     {
    return {
     type: document.querySelector(DOMStrings.inputType).value,    
     description: document.querySelector(DOMStrings.inputDescription).value, 
     value: document.querySelector(DOMStrings.inputValue).value
           }; 
      },
    
    
    getDomStrings: function()
        {
        return DOMStrings;
        }
       }
})();


//GLOBAL APP CONTROLLER
var controller = (function(bdgtCTRL,UICtrl) {
  
    var DOM = UICtrl.getDomStrings();
    
    var ctrlAddItem = function()
    {
        console.log('it works')
         //1. get the field input data
        var input = UIController.getInput();
        console.log(input)
        //2. add item to budget controller
        
        //3. add new titem to UI
        
        //4. calc budget
        // on git read-input
        //5. display budget on the UI
    }
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem)
    
    
    
    document.addEventListener('keypress', function(e) {
        if(e.keyCode===1 || event.which==13)
        ctrlAddItem();
            
     
    })
    
    
    
})(budgetController,UIController);



