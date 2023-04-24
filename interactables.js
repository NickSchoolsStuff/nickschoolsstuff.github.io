//Card Track Movement
const tracks = Array.from(document.getElementsByClassName('card-track'));

tracks.forEach(track => {
    const touchDown = e => {
        track.dataset.mouseStart = e.clientX;
    }
    
    const touchUp = () =>{
        track.dataset.mouseStart = "0";
        track.dataset.scrollProgress = track.dataset.scrollPosition;
    }
    
    const touchMove = e => {
        if(track.dataset.mouseStart === "0") return;
        const mouseDelta = parseFloat(track.dataset.mouseStart) - e.clientX;
        const maxDelta = track.offsetWidth/2;
    
        const scrollMagnitude = (mouseDelta/ maxDelta) * -100, 
        scrollPositionUncapped = scrollMagnitude + parseFloat(track.dataset.scrollProgress),
        scrollPosition = Math.max(Math.min(scrollPositionUncapped, 0), -60);
        track.dataset.scrollPosition = scrollPosition;
    
        track.animate({
            transform: `translate(${scrollPosition+5}%, 0%)`
        }, {duration: 1200, fill: "forwards"});
        for(const card of track.getElementsByClassName("card")){
            card.animate(
            {backgroundPosition: `${scrollPosition + 100}%`},
            {duration: 1200, fill: "forwards"})
        }
    }
    
    track.onmousedown = e => {
        touchDown(e)
    };
    
    track.ontouchstart = e => {
        touchDown(e.touches[0])
    };
    
    track.onmouseup = e => {
        touchUp(e)
    };
    
    track.ontouchend = e => {
        touchUp(e.touches[0])
    };
    
    track.onmousemove = e => {
        touchMove(e)
    };
    
    track.ontouchmove = e => {
        touchMove(e.touches[0])
    };
});

// this is the buttons
const openArticleButtons = document.querySelectorAll("[data-article-target]");
const closeArticleButtons = document.querySelectorAll("[data-close-article]");
const overlay = document.getElementById('overlay');

openArticleButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const article = document.querySelector(button.dataset.articleTarget);
        openArticle(article);
    })
});

closeArticleButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const article = button.closest('article');
        closeArticle(article);
    })
});

overlay.addEventListener('click', () =>{
    const articles = document.querySelectorAll("article");
    articles.forEach(article => {
        closeArticle(article);
    });
});

function openArticle(article){
    if(article == null){
        console.log('article does not exist');
        return;
    }
    article.classList.add('active');
    overlay.classList.add('toggle');
};

function closeArticle(article){
    if(article == null){
        console.log('article does not exist');
        return;
    }
    article.classList.remove('active');
    overlay.classList.remove('toggle');
};