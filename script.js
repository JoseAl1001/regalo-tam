// ==========================================================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ==========================================================================
const pantallaIntro = document.getElementById('pantalla-intro');
const sobreCarta    = document.getElementById('sobre-carta');
const musica        = document.getElementById('musica-fondo');
const videoFondo    = document.getElementById('video-fondo'); 
const overlay       = document.querySelector('.video-overlay');
const timeline      = document.getElementById('contenedor-linea-tiempo');

// ==========================================================================
// 3. EVENTO PRINCIPAL: APERTURA DEL SOBRE INTERACTIVO
// ==========================================================================
sobreCarta.addEventListener('click', () => {
    
    // Abrir el sobre visualmente
    sobreCarta.classList.add('abierto');
    
    // Reproducir música de fondo de inmediato
    musica.play().catch(error => {
        console.log("Permisos de audio requeridos por el navegador:", error);
    });

    // Configurar video a cámara lenta (0.75) y reproducir
    videoFondo.playbackRate = 0.75; 
    videoFondo.play().catch(error => {
        console.log("Error al reproducir el video de fondo:", error);
    });

    // Desvanecer el sobre y la pantalla inicial a los 1.2 segundos
    setTimeout(() => {
        pantallaIntro.classList.add('desvanecer');
    }, 1200);

    // ==========================================================================
    // LÍNEA DE TIEMPO INTERACTIVA Y SECUENCIAL (CASCADA CONTROLADA)
    // ==========================================================================
    setTimeout(() => {
        if (overlay) overlay.classList.add('oscurecer');
        if (timeline) timeline.classList.add('visible');

        // ------------------------------------------------------------------
        // [PASO A] DISPARAR SECCIÓN 2: YUKARI (Segundo 19.5 desde el inicio)
        // ------------------------------------------------------------------
        const sec2 = document.getElementById('seccion-2');
        if (sec2) sec2.classList.add('visible-block');

        const parrafo1 = document.querySelector('.friend-text-1'); 
        if (parrafo1) {
            const textoOriginal1 = parrafo1.textContent.trim();
            if (textoOriginal1 !== "") {
                parrafo1.innerHTML = ''; 
                const palabras1 = textoOriginal1.split(/\s+/);
                palabras1.forEach(palabra => {
                    const span = document.createElement('span');
                    span.textContent = palabra + ' ';
                    parrafo1.appendChild(span);
                });

                const spans1 = parrafo1.querySelectorAll('span');
                spans1.forEach((span, indice) => {
                    setTimeout(() => {
                        span.classList.add('aparecer');
                    }, indice * 220); // Velocidad calibrada a tus 220ms por palabra
                });

                // --------------------------------------------------------------
                // [PASO B] TRANSICIÓN A SECCIÓN 3: TU PÁRRAFO (PROGRESIVA)
                // --------------------------------------------------------------
                // Espera perfecta: 7.26s de escritura (33 palabras * 220ms) + 5.24s de lectura
                setTimeout(() => {
                    if (sec2) {
                        // Desvanecemos la sección de Yukari hacia opacidad 0
                        sec2.classList.add('ocultar-block');
                        
                        // Esperamos exactamente 1 segundo a que termine su animación de salida
                        setTimeout(() => {
                            sec2.classList.remove('visible-block');
                            
                            const sec3 = document.getElementById('seccion-3');
                            if (sec3) {
                                // La montamos invisible primero para preparar la transición de entrada
                                sec3.classList.add('visible-block', 'ocultar-block');
                                
                                // Pequeña pausa de 50ms para que el navegador asimile el cambio de clases
                                setTimeout(() => {
                                    // Quitamos la clase oculta para que aparezca progresivamente (fade-in de 1s)
                                    sec3.classList.remove('ocultar-block');
                                }, 50);

                                // Animamos tu propio texto (Sección 3)
                                const parrafo2 = document.querySelector('.friend-text-2'); 
                                if (parrafo2) {
                                    const textoOriginal2 = parrafo2.textContent.trim();
                                    if (textoOriginal2 !== "") {
                                        parrafo2.innerHTML = '';
                                        const palabras2 = textoOriginal2.split(/\s+/);
                                        palabras2.forEach(palabra => {
                                            const span = document.createElement('span');
                                            span.textContent = palabra + ' ';
                                            parrafo2.appendChild(span);
                                        });

                                        const spans2 = parrafo2.querySelectorAll('span');
                                        spans2.forEach((span, indice) => {
                                            setTimeout(() => {
                                                span.classList.add('aparecer');
                                            }, indice * 220); // Conserva tus mismos 220ms
                                        });
                                        
                                        // --------------------------------------------------------------
                                        // [PASO C] TRANSICIÓN A SECCIÓN 4: IMAGEN FINAL (PROGRESIVA)
                                        // --------------------------------------------------------------
                                        // Se calcula automáticamente: (Tus palabras * 220ms) + 3 segundos extras de lectura
                                        const tiempoLectura2 = (spans2.length * 220) + 3000;
                                        
                                        setTimeout(() => {
                                            // Desvanecemos tu sección (Sección 3) hacia opacidad 0
                                            sec3.classList.add('ocultar-block');
                                            
                                            // Esperamos 1 segundo a que termine su animación de salida
                                            setTimeout(() => {
                                                sec3.classList.remove('visible-block');
                                                
                                                const sec4 = document.getElementById('seccion-4');
                                                if (sec4) {
                                                    // Aplicamos la entrada progresiva a la Imagen Final (Pantalla completa)
                                                    sec4.classList.add('visible-block', 'ocultar-block');
                                                    
                                                    setTimeout(() => {
                                                        sec4.classList.remove('ocultar-block');
                                                    }, 50);

                                                    // APAGADO DEL VIDEO: Ocurre 5 segundos después de mostrarse la Sección 4
                                                    setTimeout(() => {
                                                        if (videoFondo) {
                                                            // Aplicamos una transición suave de opacidad al video
                                                            videoFondo.style.transition = "opacity 1.5s ease-out";
                                                            videoFondo.style.opacity = "0";
                                                            
                                                            // Desvanecemos también el overlay oscuro para no entorpecer la imagen
                                                            if (overlay) {
                                                                overlay.style.transition = "opacity 1.5s ease-out";
                                                                overlay.style.opacity = "0";
                                                            }

                                                            // Pausamos el elemento de video cuando la opacidad llegue por completo a cero (1.5s)
                                                            setTimeout(() => {
                                                                videoFondo.pause();
                                                            }, 1500);
                                                        }
                                                    }, 2000); // Espera fija de la imagen en pantalla
                                                }
                                            }, 1000); 
                                            
                                        }, tiempoLectura2);
                                    }
                                }
                            }
                        }, 1000); // Tiempo de desvanecimiento de salida de Yukari
                    }
                }, 17500); // Puedes modificar este valor para ajustar cuánto tiempo permanece Yukari en pantalla

            }
        }

    }, 19500); // Retraso inicial de la introducción cinematográfica
});