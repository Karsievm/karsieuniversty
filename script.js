//Mobile menu
let isOpennedMenu = false;

let header_mobile_button = '';
function OpenMobileMenu() {
    isOpennedMenu = !isOpennedMenu;
    if(isOpennedMenu) {
        document.body.classList.add('lock');
        header_mobile_button = document.getElementsByClassName('header_mobile-button')[0].innerHTML;
        document.getElementsByClassName('header_mobile-button')[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 52 52" xml:space="preserve"><path d="m31 25.4 13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"/></svg>`
        document.getElementById('navbar-default').style.display = 'block';
        setTimeout(()=> {
            document.getElementById('navbar-default').children[0].style.transform = "translateX(0%)"
        }, 100)
    } else {
        document.body.classList.remove('lock');
        document.getElementsByClassName('header_mobile-button')[0].innerHTML = header_mobile_button;
        document.getElementById('navbar-default').children[0].style.transform = "translateX(100%)"
        setTimeout(()=> {
            document.getElementById('navbar-default').style.display = 'none';
        }, 200)
    }
}

//Scroller
const scroller = Array.from(document.getElementsByClassName('scroller'));
let scrollerX = [-20, -20];
let scrollerway = true;

let scroll = 0;
const scrollHandler = (e) => {
  scrollerX[scrollerway ? 0 : 1] += 0.05;
  scrollerX[scrollerway ? 1 : 0] -= 0.05;
  const top = window.pageYOffset;
  if (scroll < top) {
      scrollerway = true;
  } else if (scroll > top) {
      scrollerway = false;
  }
  scroll = top;

  scroller.forEach((element, i) => {
      element.style.transform = `translateX(${scrollerX[i % 2]}%)`;
  });
};

scroller.forEach((element, i) => {
    const text = i % 2 === 0 ? 'KARSIE' : 'UNIVERSITY';
    for (let q = 0; q < 28; q++) {
        const span = document.createElement('span');
        span.innerHTML = text;
        element.appendChild(span);
    }
});

setInterval(() => {
    scrollerX[scrollerway ? 0 : 1] += 0.005;
    scrollerX[scrollerway ? 1 : 0] -= 0.005;
    scroller.forEach((element, i) => {
        element.style.transform = `translateX(${scrollerX[i % 2]}%)`;
    });
    if (scrollerX[0] >= -20) {
        scrollerX[0] = -45;
    } else if(scrollerX[0] <= -45) {
        scrollerX[0] = -20;
    }
    if (scrollerX[1] >= -20) {
        scrollerX[1] = -45;
    } else if(scrollerX[1] <= -45) {
        scrollerX[1] = -20;
    }
}, 1);


//листалка
let currentIndex = 0;
const blocksBlock = document.querySelectorAll('.projects_container');
const blocksContainer = document.querySelectorAll('.projects');
let blockWidth = document.querySelector('.project_item').offsetWidth + 30;
const blocks = document.querySelectorAll('.project_item');
const prevButton = document.getElementsByClassName('.prev-button');
const nextButton = document.getElementsByClassName('.next-button');

let visible = 0;


function next() {
    if (currentIndex < blocks.length - visible) {
      currentIndex++;
      showBlocks();
    }
  };
  
function prev(){
    if (currentIndex > 0) {
      currentIndex--;
      showBlocks();
    }
  };
  
  
function showBlocks() {
  blockWidth = document.querySelector('.project_item').offsetWidth + 30;
  if (currentIndex === 0) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }
  
    if (currentIndex === (blocks.length - visible)) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  blocks.forEach((block, index) => {
    block.style.transform = `translateX(-${blockWidth * currentIndex}px)`;
  });
}

showBlocks();

function checkVisibility() {
  blockWidth = document.querySelector('.project_item').offsetWidth + 30;
  let totalWidth = 0;
  let containerWidth = 0;
  blocks.forEach((block) => {
    totalWidth += block.offsetWidth;
  });
  containerWidth = blocksBlock[0].offsetWidth;

  if(totalWidth > containerWidth) {
      for(let i = 0; i < blocks.length; i++) {
          if(blockWidth * i > containerWidth) {
              continue
          } else {
              i == 0 ? visible = 1 : visible = i;
          }
      }
      blocksContainer[0].style.width = (visible * blockWidth) + 'px';
      if(window.innerWidth >= 720) {
          document.getElementsByClassName('project_buttons')[0].style.display = 'flex';
      } else {
          document.getElementsByClassName('project_buttons')[0].style.display = 'none';
      }
  } else {
      blocksContainer[0].style.width = '100%';
      document.getElementsByClassName('project_buttons')[0].style.display = 'none'
  }
}

window.addEventListener('resize', () => {
  currentIndex = 0;
  checkVisibility();
  showBlocks();
});

checkVisibility();

// Navbar background
window.addEventListener('scroll', (e) => {
    scrollHandler();
    var block = document.getElementsByClassName('section0')[0];
    var nav = document.getElementById('nav');
    var scrollTop = window.pageYOffset || document.body.scrollTop;
    var blockBottom = block.offsetTop + block.offsetHeight;
    const navlinks = Array.from(document.getElementById("navbar-default").children[0].children);
    const header_logo = document.getElementsByClassName('header_logo')[0];
    let header_mobile_button = document.getElementsByClassName('header_mobile-button')[0].innerHTML;

    if (scrollTop > blockBottom) {
      nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
      header_logo.src = 'images/logo_black.svg';
      document.getElementsByClassName('header_mobile-button')[0].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" fill="none" viewBox="0 0 17 14"><path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path></svg>';
      if(window.screen.width > 720) {
        for(let i = 0; i < navlinks.length; i++) {
          navlinks[i].children[0].style.color = "black";
        };
      } else {
        for(let i = 0; i < navlinks.length - 2; i++) {
          navlinks[i].children[0].style.color = "black";
        };
      }
    } else {
      nav.style.backgroundColor = '#000229';
      header_logo.src = 'images/logo.svg';
      document.getElementsByClassName('header_mobile-button')[0].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" fill="none" viewBox="0 0 17 14"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path></svg>';
      if(window.screen.width > 720) {
        for(let i = 0; i < navlinks.length - 2; i++) {
          navlinks[i].children[0].style.color = "white";
        };
      } else {
        for(let i = 0; i < navlinks.length - 2; i++) {
          navlinks[i].children[0].style.color = "black";
        };
      }
    }
});

//
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
}

let options = {
  threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);

  if(window.screen.height < 600) {
    options = {
      threshold: [0.2] };
      observer = new IntersectionObserver(onEntry, options);
  } else if (window.screen.height < 850) {
    options = {
    threshold: [0.25] };
    observer = new IntersectionObserver(onEntry, options);
  } else {
    options = {
      threshold: [0.5] };
      observer = new IntersectionObserver(onEntry, options);
  }
let elements = document.querySelectorAll('.element-animation');
  
window.addEventListener('resize', () => {
  if(window.screen.height < 600) {
    options = {
      threshold: [0.2] };
      observer = new IntersectionObserver(onEntry, options);
  } else if (window.screen.height < 850) {
    options = {
    threshold: [0.25] };
    observer = new IntersectionObserver(onEntry, options);
  } else {
    options = {
      threshold: [0.5] };
      observer = new IntersectionObserver(onEntry, options);
  }
});


for (let elm of elements) {
  observer.observe(elm);
}



const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 400 ? this.show() : this.hide();
    });
    document.querySelector('.btn-up').onclick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();