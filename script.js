document.addEventListener('DOMContentLoaded', () => {
    
    // ======================================================
    // --- DECLARACIÓN DE VARIABLES GLOBALES Y DOM ELEMENTS ---
    // ======================================================
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    const inicioContenido = document.querySelector('.inicio-contenido');
    const textoDinamico = document.getElementById('texto-dinamico');
    const contactForm = document.getElementById('contact-form');
    
    // Variables para el Typing Effect
    const textos = ["Desarrollador", "Estudiante", "Dev Front-end", "Dev Back-end"]; 
    let indiceTexto = 0;
    let indiceLetra = 0;
    let esBorrado = false;
    
    // ======================================================
    // --- 1. LÓGICA DE MENÚ RESPONSIVE Y SCROLL SPY ---
    // ======================================================

    // Alternar el menú de navegación en móvil (X o ☰)
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            // Usamos un operador ternario para alternar el icono (X o ☰)
            menuIcon.innerHTML = navbar.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Cerrar el menú al hacer clic en un enlace (en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.innerHTML = '☰';
            }
        });
    });
    
    // LÓGICA DEL SCROLL SPY (Resaltar al desplazarse)
    const activateLinkOnScroll = () => {
        let current = '';

        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            // Usa un pequeño ajuste para que el enlace se active antes de tocar el tope
            if (window.scrollY >= sectionTop - 150) { 
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Busca el enlace que contenga el ID de la sección actual
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', activateLinkOnScroll);

    // ======================================================
    // --- 2. LÓGICA DEL TYPING EFFECT (ESCRITURA Y BORRADO) ---
    // ======================================================
    if (textoDinamico) {
        function escribirTexto() {
            const textoActual = textos[indiceTexto];

            if (!esBorrado) {
                // Modo Escritura
                textoDinamico.textContent = textoActual.substring(0, indiceLetra);
                indiceLetra++;

                if (indiceLetra > textoActual.length) {
                    esBorrado = true;
                    setTimeout(escribirTexto, 1500); // Pausa al finalizar la escritura
                    return;
                }
            } else {
                // Modo Borrado
                textoDinamico.textContent = textoActual.substring(0, indiceLetra);
                indiceLetra--;

                if (indiceLetra < 0) {
                    esBorrado = false;
                    indiceTexto = (indiceTexto + 1) % textos.length;
                    setTimeout(escribirTexto, 500); // Pausa al finalizar el borrado
                    return;
                }
            }

            const velocidad = esBorrado ? 50 : 100;
            setTimeout(escribirTexto, velocidad);
        }
        escribirTexto(); 
    }
    
    // ======================================================
    // --- 3. LIMPIEZA DE FORMULARIO DE CONTACTO (UX) ---
    // ======================================================
    // Verifica si existen mensajes de éxito en el DOM
    const successAlert = document.querySelector('.alerta-success');

    if (successAlert && contactForm) {
        // Si hay un mensaje de éxito, vaciamos todos los campos del formulario
        contactForm.reset();
        
        // Opcional: Eliminar la alerta después de 5 segundos para que no interfiera
        setTimeout(() => {
            successAlert.style.transition = 'opacity 0.5s';
            successAlert.style.opacity = '0';
            setTimeout(() => successAlert.remove(), 500);
        }, 5000); 
    }
    
    // ======================================================
    // --- 4. ANIMACIÓN DE HABILIDADES CON INTERSECTION OBSERVER ---
    // ======================================================
    const habilidadesSeccion = document.getElementById('habilidades');
    
    if (habilidadesSeccion) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.2 // Se activa cuando el 20% es visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añade la clase 'visible' (para iniciar animaciones CSS)
                    habilidadesSeccion.classList.add('visible');
                    // Deja de observar para que la animación solo ocurra una vez
                    observer.unobserve(habilidadesSeccion); 
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(habilidadesSeccion);
    }
    
    // ======================================================
    // --- 5. LÓGICA DEL CLIC EN EL NAVBAR (Scroll Suave) ---
    // ======================================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Usamos scrollIntoView para el desplazamiento suave
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            
            // Si quieres la animación 'leaving' del menú, necesitarías CSS adicional.
        });
    });

});