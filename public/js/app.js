window.addEventListener('load', () => {
    const el = document.getElementById('app')
    
    const errorTemplate = Handlebars.compile(
        document.getElementById('error-template').innerHTML
    )
    const ratesTemplate = Handlebars.compile(
        document.getElementById('rates-template').innerHTML
    )
    const exchangeTemplate = Handlebars.compile(
        document.getElementById('exchange-template').innerHTML
    )
    const historicalTemplate = Handlebars.compile(
        document.getElementById('historical-template').innerHTML
    )

    // this was pre-router rendering code:
    // const html = ratesTemplate()
    // el.html(html)

    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = errorTemplate({
                color: 'yelow',
                title: 'Error 404 - Page NOT Found',
                message: `The path '/${path}' does not exist on this site`
            })
            el.innerHTML = html
        }
    })
    
    router.add('/', () => {
        let html = ratesTemplate()
        el.innerHTML = html
    })
    
    router.add('/exchange', () => {
        let html = exchangeTemplate()
        el.innerHTML = html
    })
    
    router.add('/historical', () => {
        let html = historicalTemplate()
        el.innerHTML = html
    })
    
    router.navigateTo(window.location.pathname)
    
    const link = $(`a[href$='${window.location.pathname}]`)
    link.addClass('active')
    
    document.addEventListener('click', e => {
        e.preventDefault()
        
        const target = e.target
        const items = document.querySelectorAll('.item')
        for (let item of items) {
            item.classList.remove('active')
        }
        target.classList.add('active') 

        const href = target.getAttribute('href')
        const path = href.substring(href.lastIndexOf('/'))
        router.navigateTo(path)
    })

    // with jquery:

    // const errorTemplate = Handlebars.compile($('#error-template').html())
    // const ratesTemplate = Handlebars.compile($('#rates-template').html())
    // const exchangeTemplate = Handlebars.compile($('#exchange-template').html())
    // const historicalTemplate = Handlebars.compile($('#historical-template').html())

    // $('a').on('click', e => {
    //     console.log('click ran')
    //     e.preventDefault()
    
    //     const target = $(e.target)
    //     $('.item').removeClass('active')
    //     target.addClass('active')
    
    //     const href = target.attr('href')
    //     const path = href.substr(href.lastIndexOf('/'))
    //     router.navigateTo(path)
    // })
})

