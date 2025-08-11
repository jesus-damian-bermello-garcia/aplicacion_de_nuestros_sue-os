// Sistema de atajos de teclado para navegación
class KeyboardShortcuts {
    constructor() {
        this.shortcuts = {};
        this.setupShortcuts();
        this.addEventListeners();
        this.showShortcutsIndicator();
    }

    setupShortcuts() {
        // Atajos para navegación principal
        this.shortcuts = {
            // Ctrl + teclas
            'ctrl+h': () => this.goToSection('#main-content', 'index.html'),
            'ctrl+p': () => this.goToSection('#products-section', 'productos.html'),
            'ctrl+c': () => this.goToSection('#categories-section'),
            'ctrl+o': () => this.goToSection('#contact-section'),
            'ctrl+l': () => window.location.href = 'login.html',
            'ctrl+r': () => window.location.href = 'register.html',
            
            // Alt + teclas para filtros de productos
            'alt+1': () => this.clickFilter('all'),
            'alt+2': () => this.clickFilter('vehicles'),
            'alt+3': () => this.clickFilter('avion'),
            'alt+4': () => this.clickFilter('toys'),
            'alt+5': () => this.clickFilter('baby'),
            'alt+6': () => this.clickFilter('Peluches'),
            
            // Atajos especiales
            'ctrl+alt': () => this.toggleTheme(),
            'ctrl+b': () => this.goBack(),
            'ctrl+shift+p': () => window.location.href = 'productos.html',
            'escape': () => this.closeModals(),
            'ctrl+/': () => this.showHelpModal()
        };
    }

    addEventListeners() {
        document.addEventListener('keydown', (e) => {
            // Evitar atajos si estamos escribiendo en un input o textarea
            if (e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA' || 
                e.target.contentEditable === 'true') {
                return;
            }

            const shortcut = this.getShortcutString(e);
            
            if (this.shortcuts[shortcut]) {
                e.preventDefault();
                e.stopPropagation();
                this.shortcuts[shortcut]();
                this.showShortcutFeedback(shortcut);
            }
        });
    }

    getShortcutString(event) {
        const parts = [];
        if (event.ctrlKey) parts.push('ctrl');
        if (event.altKey) parts.push('alt');
        if (event.shiftKey) parts.push('shift');
        
        const key = event.key.toLowerCase();
        // Excluir teclas modificadoras
        if (key !== 'control' && key !== 'alt' && key !== 'shift' && key !== 'meta') {
            parts.push(key);
        }
        
        return parts.join('+');
    }

    goToSection(selector, fallbackUrl = null) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (fallbackUrl) {
            window.location.href = fallbackUrl;
        }
    }

    clickFilter(category) {
        // Buscar por data-category attribute
        const tab = document.querySelector(`[data-category="${category}"]`);
        if (tab) {
            // Simular click
            tab.click();
        } else {
            // Si no encuentra el tab, buscar por texto
            const tabs = document.querySelectorAll('#categoryTabs .nav-link');
            tabs.forEach(tab => {
                const text = tab.textContent.toLowerCase();
                if ((category === 'all' && text.includes('todos')) ||
                    (category === 'vehicles' && text.includes('vehículos')) ||
                    (category === 'avion' && text.includes('avion')) ||
                    (category === 'toys' && text.includes('juguetes')) ||
                    (category === 'baby' && text.includes('bebe')) ||
                    (category === 'Peluches' && text.includes('peluches'))) {
                    tab.click();
                }
            });
        }
    }

    toggleTheme() {
        // Buscar botón de tema
        const themeBtn = document.querySelector('.theme-toggle');
        if (themeBtn) {
            themeBtn.click();
        } else if (typeof toggleTheme === 'function') {
            toggleTheme();
        } else {
            // Implementación básica si no existe
            const body = document.body;
            const currentTheme = body.getAttribute('data-bs-theme');
            body.setAttribute('data-bs-theme', currentTheme === 'dark' ? 'light' : 'dark');
        }
    }

    goBack() {
        // Buscar botón de regresar
        const backBtn = document.querySelector('a[href*="index.html"]');
        if (backBtn && (backBtn.textContent.includes('Regresar') || backBtn.textContent.includes('Volver'))) {
            backBtn.click();
        } else {
            // Si no hay botón específico, usar history
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        }
    }

    closeModals() {
        // Cerrar modales de Bootstrap
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });

        // Cerrar navbar si está abierto
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    }

    showShortcutFeedback(shortcut) {
        // Crear notificación temporal
        const toast = document.createElement('div');
        toast.className = 'position-fixed top-0 end-0 m-3 alert alert-info alert-dismissible fade show';
        toast.style.zIndex = '9999';
        toast.style.minWidth = '250px';
        toast.innerHTML = `
            <i class="fas fa-keyboard me-2"></i>
            <strong>Atajo usado:</strong> ${shortcut.toUpperCase()}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-remover después de 2 segundos
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 2000);
    }

    showShortcutsIndicator() {
        // Crear indicador de atajos disponibles
        const indicator = document.createElement('div');
        indicator.className = 'position-fixed bottom-0 start-0 m-3';
        indicator.style.zIndex = '1000';
        indicator.innerHTML = `
            <div class="bg-primary text-white p-2 rounded shadow" style="font-size: 0.8rem;">
                <i class="fas fa-keyboard me-1"></i>
                <strong>Atajos:</strong> Ctrl+H (Inicio) | Ctrl+P (Productos) | Ctrl+T (Tema) | Ctrl+/ (Ayuda)
            </div>
        `;
        
        document.body.appendChild(indicator);
        
        // Ocultar después de 8 segundos
        setTimeout(() => {
            if (indicator.parentElement) {
                indicator.remove();
            }
        }, 8000);
    }

    showHelpModal() {
        // Remover modal existente si existe
        const existingModal = document.querySelector('#shortcutsModal');
        if (existingModal) {
            existingModal.remove();
        }

        const helpContent = `
            <div class="modal fade" id="shortcutsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-keyboard me-2"></i>Atajos de Teclado Disponibles
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6 class="text-primary">📍 Navegación:</h6>
                                    <ul class="list-unstyled">
                                        <li><kbd class="bg-black">Ctrl + H</kbd> - Ir al Inicio</li>
                                        <li><kbd class="bg-black">Ctrl + P</kbd> - Ver Productos</li>
                                        <li><kbd class="bg-black">Ctrl + C</kbd> - Ver Categorías</li>
                                        <li><kbd class="bg-black">Ctrl + O</kbd> - Ver Contacto</li>
                                        <li><kbd class="bg-black">Ctrl + L</kbd> - Iniciar Sesión</li>
                                        <li><kbd class="bg-black">Ctrl + R</kbd> - Registrarse</li>
                                        <li><kbd class="bg-black">Ctrl + B</kbd> - Regresar/Atrás</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h6 class="text-primary">🏷️ Filtros de Productos:</h6>
                                    <ul class="list-unstyled">
                                        <li><kbd class="bg-black">Alt + 1</kbd> - Todos los productos</li>
                                        <li><kbd class="bg-black">Alt + 2</kbd> - Vehículos</li>
                                        <li><kbd class="bg-black">Alt + 3</kbd> - Aviones</li>
                                        <li><kbd class="bg-black">Alt + 4</kbd> - Juguetes</li>
                                        <li><kbd class="bg-black">Alt + 5</kbd> - Bebés Llorones</li>
                                        <li><kbd class="bg-black">Alt + 6</kbd> - Peluches</li>
                                    </ul>
                                </div>
                            </div>
                            <hr>
                            <h6 class="text-primary">⚡ Acciones Especiales:</h6>
                            <ul class="list-unstyled">
                                <li><kbd class="bg-black">Ctrl + Alt</kbd> - Cambiar tema (claro/oscuro)</li>
                                <li><kbd class="bg-black">Esc</kbd> - Cerrar modales y menús</li>
                                <li><kbd class="bg-black">Ctrl + /</kbd> - Mostrar esta ayuda</li>
                                <li><kbd class="bg-black">Ctrl + Shift + P</kbd> - Ir directo a productos</li>
                            </ul>
                            <div class="alert alert-info mt-3">
                                <i class="fas fa-info-circle me-2"></i>
                                <strong>Tip:</strong> Los atajos no funcionan mientras escribes en campos de texto.
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar modal al DOM
        document.body.insertAdjacentHTML('beforeend', helpContent);
        
        // Mostrar modal
        const modal = new bootstrap.Modal(document.querySelector('#shortcutsModal'));
        modal.show();
        
        // Limpiar modal después de cerrarlo
        document.querySelector('#shortcutsModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que Bootstrap esté disponible
    if (typeof bootstrap !== 'undefined') {
        new KeyboardShortcuts();
        console.log('✅ Sistema de atajos de teclado inicializado correctamente');
    } else {
        console.warn('⚠️ Bootstrap no está disponible. Los atajos de teclado pueden no funcionar correctamente.');
        // Intentar inicializar después de un delay
        setTimeout(() => {
            new KeyboardShortcuts();
        }, 1000);
    }
});

// Hacer la clase disponible globalmente por si se necesita
window.KeyboardShortcuts = KeyboardShortcuts;