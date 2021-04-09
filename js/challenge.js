"use strict";

function _toConsumableArray(a) {
    if(Array.isArray(a)){  
        for(let b = 0, c = Array(a.length); b < a.length; b++) {
            c[b] = a[b];
            return c;
        }//The [Array.from()] static method creates a new, shallow-copied 
    }    //Array instance from an array-like iterable object.
    return Array.from(a); 
}

let isPlaying = !0;

const timer = function() { 
    return setInterval(function() { 
        const a = document.getElementById("counter");
        const b = parseInt(a.innerText); 
        a.innerText = b + 1; 
        }, 1e3) 
};
let interval = timer(); //since interval would be re-assigned 
//every time the pausebutton is clicked, it has to be declared with let.

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
    
    let d = void 0;

    if([].concat(_toConsumableArray(c.children))
        .map(function(a) {return parseInt(a.dataset.num);})
        .includes(b)) {
        d = document.querySelector('[data-num="' + b + '"]');
        const e = parseInt(d.children[0].innerText);
        d.innerHTML = b + " has been liked <span>"+ (e + 1) + "</span> times";
    }
    else { 
        d = document.createElement("li");
        d.setAttribute("data-num", b); 
        d.innerHTML = b + " has been liked <span>1</span> time";
    }
    c.appendChild(d);
}); 

pause.addEventListener("click", function() {
    if(isPlaying) {
        isPlaying = !1; 
        clearInterval(interval); 
        this.innerText = "resume";
     }
    else {
        isPlaying = !0; 
        interval = timer(); 
        this.innerText = "pause";
    }  // [].callback(arguments) is a boilerplate code used to convert a set    
    // of arguments into an array
    [].concat(_toConsumableArray(document.getElementsByTagName("button")))
    .forEach(function(a){
        "pause" !== a.id && (a.disabled = !isPlaying);
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