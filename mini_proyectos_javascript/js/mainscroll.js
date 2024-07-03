const container = document.querySelector('.containerr');

        window.addEventListener('scroll', () => {
            const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

            console.log(`scrollTop + clientHeight = ${scrollTop + clientHeight} | Altura personalizada = ${scrollHeight -3 }`);
            if (scrollTop + clientHeight > scrollHeight - 5) {
                setTimeout(newContainer, 1000);
            }
        });

        const newContainer = () => {
            const boxes = ['d', 'e', 'f'];
            boxes.forEach(className => {
                const box = document.createElement('div');
                box.className = `box ${className}`;
                container.appendChild(box);
            });
        }