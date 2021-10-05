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

    const elements = document.querySelectorAll('[data-fixed]')
    elements.forEach(element => {
        //Variables  
    let rect = element.getBoundingClientRect()
    const offset = parseInt(element.getAttribute('data-offset') || 0, 10)
    if (!offset) {

    }
    let top = rect.top + scrollY()
    const fake = document.createElement('div')
    fake.style.width = rect.width + 'px'
    fake.style.height = rect.height + 'px'
    
    //Fonctions

        const onScroll = function() {
            const hasScrollClass = element.classList.contains('fixed')
            if (scrollY() > top - offset && !hasScrollClass) {
                element.classList.add('fixed')
                element.style.top = offset + 'px'
                element.style.width = rect.width + 'px'
                element.parentNode.insertBefore(fake, element)
            } else if (scrollY() < top - offset && hasScrollClass) {
                element.classList.remove('fixed')
                element.parentNode.removeChild(fake)

            }
        }

        const onResize = () => {
            element.style.width = "auto"
            element.classList.remove('fixed')
            fake.style.display = "none"
            rect = element.getBoundingClientRect()
            let top = rect.top + scrollY()
            fake.style.width = rect.width + 'px'
            fake.style.height = rect.height + 'px'
            fake.style.display = "block"
            onScroll()
        }

        //Listeners
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)

    });

})()