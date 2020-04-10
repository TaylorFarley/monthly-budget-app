
var budgetController = (function() {
    
   var x=23
    var add = function(a){
        return x+a;
        }
    
    var tmp = function()
    {
        console.log()
    }
    return {
        publicTest: function(b){
        console.log(add(b)); },
        
        test: function(){
            
            console.log(x)
        }
    }
})();


var UIController = (function() {
    
    //some code
    // adding some more code to
})();



var controller = (function(bdgtCTRL,UICtrl) {
    
    document.querySelector('.add__btn').addEventListener('click',function(){
//do something
    });
    
    
    document.addEventListener('keypress',function(e){
        console.log(e.key)
    })
    
    
})(budgetController,UIController);


