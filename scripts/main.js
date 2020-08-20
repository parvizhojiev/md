function ripple() {
    document.querySelectorAll('.raised-button, .flat-button, .outline-button, .floating-action-button, .icon-button').forEach(function(button) {
        if(!button.onpointerdown){
            button.onpointerdown = function(e){
                // creating ripple and adding class
                var ripple = document.createElement('ripple')
                ripple.classList.add('ripple')
                
                // adding ripple to element
                button.appendChild(ripple)

                // positioning element
                ripple.style.left = `${e.offsetX}px`
                ripple.style.top = `${e.offsetY}px`
                
                // counting size
                var size
                if(button.offsetHeight > button.offsetWidth) {
                    size = button.offsetWidth + 40 + button.offsetHeight - button.offsetWidth
                } else {
                    size = button.offsetWidth + 10
                }

                if(button.offsetWidth - button.offsetHeight < button.offsetWidth / 5) {
                    size += Math.floor(button.offsetWidth / 2.5)
                }
                
                // adding transition
                ripple.style.transition = `${size / 10 + 300}ms, opacity 100ms`

                ripple.style.opacity = 0.4

                // positioning ripple to center
                ripple.style.left = `${button.offsetWidth / 2}px`
                ripple.style.top = `${button.offsetHeight / 2}px`
                // scaling ripple
                ripple.style.width = `${size}px`
                ripple.style.height = `${size}px`
                
                // pointer up event
                document.onpointerup = function(){
                    ripple.style.transition = '350ms, opacity 500ms'
                    // if ripple size equals to button size, removing ripple
                    if(ripple.offsetWidth == size) {
                        ripple.style.opacity = 0
                        
                        setTimeout(() => {
                            ripple.remove()
                        }, 500);
                    }
                    // else removing after some time
                    else {
                        setTimeout(() => {
                            ripple.style.opacity = 0
                            
                            setTimeout(() => {
                                ripple.remove()
                            }, 500);
                        }, size / 10 + 100);
                    }
                }
            }
        }
    })
}

setInterval(() => {
    ripple()
}, 100);

// DOMNodeInserted
// DOMNodeRemoved