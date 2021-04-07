"use strict";

//the following function is used by the heartbutton and the pausebutton
//heartbutton uses this function to create an array from the childNodes of ul
//pausebutton uses this function to create an array <button> nodeList
function _toConsumableArray(a) {
    if(Array.isArray(a)){  //The Array.isArray() method determines whether the passed-in
                           //argument is an Array.
        for(let b = 0, 
            c = Array(a.length); //creates an array of fixed length
            b < a.length; 
            b++) {
            c[b] = a[b];  //this for loop creates a deep copy from the passed-in array
            return c;
        }
    }
    return Array.from(a); //creates a shallow copy from the passed-in array
}

let playing = !0; //a boolean variable set to true

const timer = function() { //when timer() is called, setInterval() is executed
    return setInterval(function() { //this is the countUp function
        const a = document.getElementById("counter");
        //assign a variable to reference the DOM element so that
        //it can be modified using JavaScript

        const b = parseInt(a.innerText); //accesses the string inside the DOM element and
                                         //turns the numString into an integer
        a.innerText = b + 1; //modifies the DOM element with id="counter"
        },
    1e3) //passing 1000 milliseconds as the second argument to setInterval()
         //every second, the function() passed as the first argument of setInterval() is executed
};
let interval = timer(); //timer() function is called, thus counter starts ticking every second
//since interval would be re-assigned every time the pausebutton is clicked,
//it has to be declared with let.

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const heart = document.getElementById("heart");
const pause = document.getElementById("pause");
const commentForm = document.getElementsByTagName("form")[0];

minus.addEventListener("click", function() {
    const a = document.getElementById("counter");
    const b = parseInt(a.innerText);
    a.innerText = b - 1;
});

plus.addEventListener("click", function(){
    const a = document.getElementById("counter");
    const b = parseInt(a.innerText);
    a.innerText = b + 1;
});

heart.addEventListener("click",function() {
    const a = document.getElementById("counter");
    const b = parseInt(a.innerText);
    const c = document.querySelector(".likes");
    //assign a variable to reference the DOM element with class="likes",
    //which in this case is an unordered list.
    let d = void 0;  //??declares d and initializes it to undefined???

    if([].concat(_toConsumableArray(c.children)).map(function(a) 
                                    //returns a live, ordered collection of DOM
                                    //elements which are children of c,
                                    //this collection is array-like,
                                    //that is, it has length property
        {
        return parseInt(a.dataset.num);
        }).includes(b)) //if the heart button is clicked more than once every second
                        //which means, the first click always bypasses the statements
                        //inside this if block
    {
        d = document.querySelector('[data-num="' + b + '"]');
        //here "data-num" is a custom data attribute
        //here querySelector returns a live node whose attribute is "data-num"
        
        const e = parseInt(d.children[0].innerText);
        d.innerHTML = b + " has been liked <span>"+ (e + 1) + "</span> times";
    }
    else { //if the heart button is clicked once every second
           //the statements inside this if block is always executed
           //with the first click of a multiple split-second clicks
        d = document.createElement("li");
        d.setAttribute("data-num", b); //A custom data attribute is an attribute in no namespace
        // whose name starts with the string "data-", has at least one character after the hyphen.
        d.innerHTML = b + " has been liked <span>1</span> time";
    }
    c.appendChild(d);//appends the list element to the DOM element with class="likes"
}); //

pause.addEventListener("click", function() {

    if(playing) {
        playing = !1, clearInterval(interval), this.innerText = "resume";
        //since [function()] is called as a property of [addEventListener], 
        //[this] refers to the object that [addEventListener] is attached to;
        //in this case, that object is an HTML Element.
     }
    else {
        playing = !0, interval = timer(), this.innerText = "pause";
    }

    [].concat(_toConsumableArray(document.getElementsByTagName("button"))).forEach(function(a){
        "pause" !== a.id && (a.disabled = !playing);
    });

});

commentForm.addEventListener("submit", function(a) {
    a.preventDefault();
    const b = this.children[0];
    const c = b.value;
    b.value = "";
    const d = document.querySelector(".comments");
    const e = document.createElement("p");
    e.innerText = c;
    d.appendChild(e);
});