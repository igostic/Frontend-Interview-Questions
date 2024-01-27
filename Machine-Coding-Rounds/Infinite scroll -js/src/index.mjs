// https://learnersbucket.com/examples/interview/implement-infinite-scroll-in-react/
// https://www.youtube.com/watch?v=Ckka1HhE2kM&list=PL_KW_uw2ITn_J_BNfTpv-yePk8vcyg4dp&index=4&ab_channel=Learnersbucket

let count = 50;
const mainElement = document.getElementById('infinite-box');

function renderElements() {
    for (let i = count - 50; i < count; i++) {
        const span = document.createElement('span');
        span.classList.add('content');
        span.textContent = i + 1;
        span.style.display = "block";
        mainElement.appendChild(span);
    }
}

function onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 30) {
        count += 50;
        renderElements();
    }
}

renderElements(); // Initial render
window.addEventListener('scroll', onScroll);


// onScroll Function:
// This is the event handler for the scroll event.
// const onScroll = () => { ... }

// window.innerHeight: This represents the height of the
// browser window's content area. It's the visible
// portion of the web page.

// window.scrollY: This gives the number of pixels that
// the document is currently scrolled vertically.
// window.document.body.offsetHeight: This gives the total
// height of the document, including any content that may
// not be visible due to scrolling.

// This condition checks if the user has scrolled to within
// 30 pixels from the bottom of the page. If true, it means
// the user is near the end of the page and more items
// should be loaded.
// (window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 30)
