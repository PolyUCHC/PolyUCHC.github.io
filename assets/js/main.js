/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== NEWS ====================*/
async function loadNewsFromDocx() {
    const response = await fetch('assets/data/news.docx');
    const arrayBuffer = await response.arrayBuffer();

    mammoth.convertToHtml({ arrayBuffer })
        .then(result => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = result.value;

            const firstImg = tempDiv.querySelector("img");
            if (firstImg) firstImg.remove(); // Remove from text

            const paragraphs = tempDiv.querySelectorAll('p');
            const textHtml = Array.from(paragraphs).map(p => p.outerHTML).join('');

            const container = document.getElementById('news-container');
            container.innerHTML = `
              <div class="news-flex">
                <div class="news-text">
                  ${textHtml}
                </div>
                <div class="news-image">
                  ${firstImg ? firstImg.outerHTML : ''}
                </div>
              </div>
            `;
        })
        .catch(err => console.error("Error loading Word doc:", err));
}
loadNewsFromDocx();




/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

