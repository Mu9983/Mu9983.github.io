document.addEventListener('DOMContentLoaded', () => {
    class Fireworks {
        constructor() {
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            this.particles = [];
            this.hue = 120;

            window.addEventListener('resize', () => {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            });

            document.addEventListener('click', (e) => {
                this.createFirework(e.clientX, e.clientY);
            });
        }

        createFirework(x, y) {
            const particleCount = 100;
            for (let i = 0; i < particleCount; i++) {
                this.particles.push(new Particle(x, y, this.hue));
            }
        }

        animate() {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach((particle, index) => {
                particle.update();
                particle.draw(this.ctx);

                if (particle.alpha <= 0) {
                    this.particles.splice(index, 1);
                }
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    class Particle {
        constructor(x, y, hue) {
            this.x = x;
            this.y = y;
            this.hue = hue;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${this.hue}, 100%, 50%)`;
            this.alpha = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.01;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const fireworks = new Fireworks();
    fireworks.animate();
});