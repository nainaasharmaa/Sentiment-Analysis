// Three.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

const posArray = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 30;
    
    // Colors - creating a blue/purple palette
    if (i % 3 === 0) colors[i] = Math.random() * 0.3 + 0.1; // R
    if (i % 3 === 1) colors[i] = Math.random() * 0.3 + 0.3; // G
    if (i % 3 === 2) colors[i] = Math.random() * 0.5 + 0.5; // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 15;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.y += 0.002;
    particlesMesh.rotation.x += 0.001;
    
    // Subtle mouse follow effect
    particlesMesh.rotation.y += mouseX * 0.01;
    particlesMesh.rotation.x += mouseY * 0.01;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// Sentiment Analysis Mock Function

document.getElementById('analyze-btn').addEventListener('click', () => {
    const reviewText = document.getElementById('review-text').value.trim();
    
    if (reviewText === '') {
        alert('Please enter a movie review to analyze');
        return;
    }

    analyzeSentiment(reviewText);
});

async function analyzeSentiment(text) {
    const button = document.getElementById('analyze-btn');
    button.textContent = 'Analyzing...';

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ review: text })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();  
        console.log(data);
        
        displayResults(data);
    } catch (error) {
        alert('An error occurred: ' + error.message);
    } finally {
        button.textContent = 'Analyze Sentiment';
    }
}

function displayResults(data) {
    document.getElementById('result-container').style.display = 'block';

    const confidence = data.confidence; // scale to 0–1
    const percentage = confidence;

    document.getElementById('meter-fill').style.width = `${percentage}%`;
    document.getElementById('score-value').textContent = confidence.toFixed(2);
    document.getElementById('sentiment-text').textContent = data.sentiment;
}
