
var budgetController = (function() {
    
//some code 
    
})();


var UIController = (function() {
 
    //some code
    
})();


//GLOBAL APP CONTROLLER
var controller = (function(bdgtCTRL,UICtrl) {
  
    var ctrlAddItem = function()
    {
        console.log('it works')
         //1. get the field input data
        
        //2. add item to budget controller
        
        //3. add new titem to UI
        
        //4. calc budget
        // on git read-input
        //5. display budget on the UI
    }
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem)
    
    
    
    document.addEventListener('keypress', function(e) {
        if(e.keyCode===1 || event.which==13)
        ctrlAddItem();
            
     
    })
    
    
    
})(budgetController,UIController);



