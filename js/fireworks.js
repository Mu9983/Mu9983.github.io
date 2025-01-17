document.addEventListener('DOMContentLoaded', () => {
    class Fireworks {
        constructor() {
            // ���� canvas Ԫ�ز����ӵ�ҳ����
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            // ���� canvas �ߴ�
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            // ��ʼ�������������ɫ
            this.particles = [];
            this.hue = 120;

            // �������ڴ�С�仯������ canvas �ߴ�
            window.addEventListener('resize', () => {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            });

            // ���ӵ���¼�������
            document.addEventListener('click', (e) => {
                console.log('Click event triggered', e.clientX, e.clientY);
                this.createFirework(e.clientX, e.clientY);
            });

            // ��������ѭ��
            this.animate();
        }

        // �����̻�Ч��
        createFirework(x, y) {
            const particleCount = 100;
            for (let i = 0; i < particleCount; i++) {
                this.particles.push(new Particle(x, y, this.hue));
            }
        }

        // ����ѭ��
        animate() {
            console.log('Animation frame');
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

    // ������
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

        // ��������λ��
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.01;
        }

        // ��������
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

    // ��ʼ���̻�Ч��
    const fireworks = new Fireworks();
});