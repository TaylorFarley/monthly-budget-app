
var budgetController = (function() {
    
   var x=23
    var add = function(a){
        return x+a;
        }
    
 
    return {
        publicTest: function(b){
        return add(b); }
        
        
    }
})();


var UIController = (function() {
    
    //some code
    // adding some more code to
})();



var controller = (function(bdgtCTRL,UICtrl) {
    
    var x = bdgtCTRL.publicTest(5)
    
    return {
        publicTest2: function()
        {
            console.log(x)
        }
    }
    
    document.querySelector('.add__btn').addEventListener('click',function(){
//do something
    });
    
    
    document.addEventListener('keypress',function(e){
        console.log(e.key)
    })
    
    
})(budgetController,UIController);

console.log(controller.publicTest2())

