document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('matrixTunnel');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const characters = '01';
    const numParticles = 2000;
    const speed = 1;
    let particles = [];

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width - width / 2;
            this.y = Math.random() * height - height / 2;
            this.z = Math.random() * width;
            this.char = characters.charAt(Math.floor(Math.random() * characters.length));
        }

        update() {
            this.z -= speed;
            if (this.z <= 0) {
                this.init();
            }
        }

        draw() {
            let perspective = width / this.z;
            let x = this.x * perspective + width / 2;
            let y = this.y * perspective + height / 2;
            let size = perspective * 2;
            ctx.fillStyle = '#4169e1'; // Change color to royal blue
            ctx.font = `${size}px monospace`;
            ctx.fillText(this.char, x, y);
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        // Create the trail effect by using a transparent black fill
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animate();
});
