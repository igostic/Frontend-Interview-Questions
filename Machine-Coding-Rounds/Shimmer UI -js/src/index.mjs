import "./styles.css";

const shimmerContainer = document.getElementById('shimmer-container');

function createShimmer() {
    const shimmerElement = document.createElement('div');
    shimmerElement.classList.add('shimmer');
    shimmerContainer.appendChild(shimmerElement);
}

for (let i = 0; i < 5; i++) {
    createShimmer();
}
