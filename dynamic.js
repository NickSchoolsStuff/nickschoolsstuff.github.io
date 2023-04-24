const sections = document.querySelectorAll('section');

function resizeSections(){
    sections.forEach(section =>{
        section.style.transform = `translate(${(window.innerWidth-section.offsetWidth)/2}px)`
    });
};

window.onresize = () => {
    resizeSections();
};

resizeSections();
