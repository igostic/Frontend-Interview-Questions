import "./styles.css";

class myIntersectionObserver {
  constructor(callbackFn) {
    this.entries = [];

    this.handleScroll = () => {
      if(!this.entries.length) return;

      this.inIntersecting = entry => {
        const scrollTopPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const windowBottomScrollPosition = scrollTopPosition + windowHeight;

        return windowBottomScrollPosition > entry.top && scrollTopPosition < entry.bottom
      }

      this.entries.forEach((entry, idx) => {
        if(!this.entries[idx].isInterSecting && this.isInterSecting(entry)){
          this.entries[idx].isInterSecting = true;
          callbackFn(this.entries)
        } else if(this.entries[idx].isInterSecting && !this.isInterSecting(entry)){
            this.entries[idx].isInterSecting = false;
          callbackFn(this.entries)
        }
      });
    }

    window.addEventListener('scroll', this.handleScroll);
  }

  observe(element) {
    this.entries.push({
      isInterSecting: false,
      target: element,
      top: element.getBoundingClientRect().top,
      bottom: element.getBoundingClientRect().bottom,
    });
    // for initial rendering of the page
    // this.handleScroll();
  }
}

const observer = new myIntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isInterSecting){
      entry.target.classList.add('show');
    } else{
      entry.target.classList.remove('show');
    }
  })
})

document.querySelectorAll('p').forEach((element) => {
  observer.observe(element)})
