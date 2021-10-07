(function() {
 
    /* 
    On écoute le scroll
    SI le menu sort de l'ecran
    ALORS il deviendra fixe
    */
   
    const scrollY = () => {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    //window.function rend la fonction globale
    window.makeStiky = (element) => {
        //Variables 
        let rect = element.getBoundingClientRect()
        const offset = parseInt(element.getAttribute('data-offset') || 0, 10)
    
        // if (element.getAttribute('data-constraint')) {
        //     let constraint = document.querySelector(element.getAttribute('data-constraint'))        
        // } else {
        //     let constraint = document.body
        // }
        let constraint = (element.getAttribute('data-constraint')) ? document.querySelector(element.getAttribute('data-constraint')) : document.body
        let constraintRect = constraint.getBoundingClientRect()
        let constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
        let top = rect.top + scrollY()
        const fake = document.createElement('div')
        fake.style.width = rect.width + "px"
        fake.style.height = rect.height + "px"
        
        //Fonctions
    
            const onScroll = function() {
                if (scrollY() > constraintBottom && element.style.position != "absolute") {
                    element.style.position = "absolute"
                    element.style.bottom = "0"
                    element.style.top = "auto"
                } else if (scrollY() > constraintBottom) {               
                } else if (scrollY() > top - offset && element.style.position != "fixed") {
                    element.classList.add('fixed')
                    element.style.position = "fixed"
                    element.style.top = offset + 'px'
                    element.style.bottom = "auto"
                    element.style.width = rect.width + 'px'
                    element.parentNode.insertBefore(fake, element)
                } else if (scrollY() < top - offset && element.style.position != "static") {
                    element.classList.remove('fixed')
                    element.style.position = "static"
                    if (element.parentNode.contains(fake)) {
                        element.parentNode.removeChild(fake)
                    }
                }
            }
    
            const onResize = () => {
                element.style.width = "auto"
                element.classList.remove('fixed')
                element.style.position = "static"
                fake.style.display = "none"
                rect = element.getBoundingClientRect()
                constraintRect = constraint.getBoundingClientRect()
                constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
                let top = rect.top + scrollY()
                fake.style.width = rect.width + 'px'
                fake.style.height = rect.height + 'px'
                fake.style.display = "block"
                onScroll()
            }
    
            //Listeners
            window.addEventListener('scroll', onScroll)
            window.addEventListener('resize', onResize)
    
    }


    const elements = document.querySelectorAll('[data-fixed]')
    elements.forEach(element => { makeStiky(element)});

})()