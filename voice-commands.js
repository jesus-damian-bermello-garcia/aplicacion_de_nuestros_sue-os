// Sistema de comandos de voz para navbar y productos
class VoiceCommands {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.initSpeechRecognition();
        this.addVoiceButton();
        this.setupCommands();
    }

    initSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.log('Speech API no soportada');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'es-ES';

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            this.processCommand(transcript);
        };

        this.recognition.onerror = () => {
            this.stopListening();
        };

        this.recognition.onend = () => {
            this.stopListening();
        };
    }

    addVoiceButton() {
        // Para index.html (navbar normal)
        let navbar = document.querySelector('.navbar .container');
        
        // Para productos.html (navbar con tabs)
        if (!navbar) {
            navbar = document.querySelector('#categoryTabs');
        }
        
        if (!navbar) return;

        const voiceBtn = document.createElement('button');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.className = 'btn btn-outline-light voice-btn ms-2';
        voiceBtn.onclick = () => this.toggleListening();
        voiceBtn.title = 'Comando de voz';
        
        navbar.appendChild(voiceBtn);
        this.voiceBtn = voiceBtn;
    }

    setupCommands() {
        // Comandos para navbar (sin contraste aquí ya que se maneja arriba)
        this.navCommands = {
            'inicio': () => document.querySelector('a[href="#main-content"]')?.click(),
            'productos': () => {
                // Si estamos en index.html, ir a sección productos
                const productsSection = document.querySelector('a[href="#products-section"]');
                if (productsSection) {
                    productsSection.click();
                } else {
                    // Si estamos en productos.html, mostrar todos los productos
                    const allTab = document.querySelector('[data-category="all"]');
                    if (allTab) allTab.click();
                }
            },
            'categorías': () => document.querySelector('a[href="#categories-section"]')?.click(),
            'contacto': () => document.querySelector('a[href="#contact-section"]')?.click(),
            'login': () => window.location.href = 'login.html',
            'registro': () => window.location.href = 'register.html'
        };

        // Comandos para filtros de productos (productos.html)
        this.filterCommands = {
            'todos': () => this.clickTab('all'),
            'vehículos': () => this.clickTab('vehicles'),
            'aviones': () => this.clickTab('avion'),
            'juguetes': () => this.clickTab('toys'),
            'bebés': () => this.clickTab('baby'),
            'peluches': () => this.clickTab('Peluches')
        };

        // Comandos para productos específicos
        this.productCommands = {
            'helicóptero': () => this.findProduct('helicóptero'),
            'avión': () => this.findProduct('avión'),
            'bebé': () => this.findProduct('bebé'),
            'nenuco': () => this.findProduct('nenuco'),
            'stitch': () => this.findProduct('stitch'),
            'capibara': () => this.findProduct('capibara'),
            'rayo': () => this.findProduct('rayo'),
            'volqueta': () => this.findProduct('volqueta'),
            'muñeca': () => this.findProduct('muñeca'),
            'sonajero': () => this.findProduct('sonajero'),
            'dinosaurio': () => this.findProduct('dinosaurio'),
            'dron': () => this.findProduct('dron'),
            'tanque': () => this.findProduct('tanque')
        };
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (!this.recognition) return;
        
        this.isListening = true;
        this.voiceBtn.innerHTML = '<i class="fas fa-stop text-danger"></i>';
        this.voiceBtn.classList.add('listening');
        
        this.recognition.start();
    }

    stopListening() {
        this.isListening = false;
        if (this.voiceBtn) {
            this.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            this.voiceBtn.classList.remove('listening');
        }
    }

    processCommand(command) {
        console.log('Comando recibido:', command);

        // Comando especial para contraste (buscar botón de tema)
        if (command.includes('contraste')) {
            // Buscar el botón de tema por diferentes métodos
            let themeBtn = document.querySelector('button[onclick="toggleTheme()"]') ||
                          document.querySelector('.theme-toggle') ||
                          document.querySelector('button[title*="tema"]') ||
                          document.querySelector('button[aria-label*="tema"]');
            
            if (themeBtn) {
                themeBtn.click();
            } else if (typeof toggleTheme === 'function') {
                toggleTheme();
            }
            return;
        }

        // Comando especial para regresar (buscar por texto del botón)
        if (command.includes('regresar') || command.includes('volver')) {
            const backBtn = Array.from(document.querySelectorAll('a')).find(a => 
                a.textContent.includes('Regresar') && a.href.includes('index.html')
            );
            if (backBtn) {
                backBtn.click();
                return;
            }
            // Fallback directo
            window.location.href = 'index.html';
            return;
        }

        // Buscar comandos de múltiples palabras
        if (command.includes('ver productos')) {
            window.location.href = 'productos.html';
            return;
        }

        // Buscar en comandos de navegación
        if (this.navCommands[command]) {
            this.navCommands[command]();
            return;
        }

        // Buscar en comandos de filtros
        if (this.filterCommands[command]) {
            this.filterCommands[command]();
            return;
        }

        // Buscar en comandos de productos
        if (this.productCommands[command]) {
            this.productCommands[command]();
            return;
        }

        // Buscar coincidencias parciales
        const allCommands = {...this.navCommands, ...this.filterCommands, ...this.productCommands};
        const partialMatch = Object.keys(allCommands).find(key => 
            command.includes(key) || key.includes(command)
        );

        if (partialMatch) {
            allCommands[partialMatch]();
        }
    }

    clickTab(category) {
        const tab = document.querySelector(`[data-category="${category}"]`);
        if (tab) tab.click();
    }

    findProduct(productName) {
        const products = document.querySelectorAll('.product-title');
        for (let product of products) {
            if (product.textContent.toLowerCase().includes(productName)) {
                product.closest('.product-card').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                product.closest('.product-card').style.border = '3px solid #ff6b35';
                setTimeout(() => {
                    product.closest('.product-card').style.border = '';
                }, 2000);
                break;
            }
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new VoiceCommands();
});

// Estilos CSS para el botón de voz
const voiceStyles = `
.voice-btn {
    border-radius: 50% !important;
    width: 45px !important;
    height: 45px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.3s ease !important;
}

.voice-btn:hover {
    transform: scale(1.1) !important;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2) !important;
}

.voice-btn.listening {
    animation: pulse-voice 1s infinite !important;
    background: #dc3545 !important;
    border-color: #dc3545 !important;
}

@keyframes pulse-voice {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = voiceStyles;
document.head.appendChild(styleSheet);