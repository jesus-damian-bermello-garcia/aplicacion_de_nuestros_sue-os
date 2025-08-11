// Script completo para modo claro/oscuro - Compatible con todas las páginas
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = body.getAttribute('data-bs-theme') || 'light';
    
    if (currentTheme === 'light') {
        // Cambiar a tema oscuro
        body.setAttribute('data-bs-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
        
        // Aplicar estilos oscuros
        applyDarkTheme();
        
        // Guardar preferencia
        try {
            localStorage.setItem('theme', 'dark');
        } catch(e) {
            console.log('No se pudo guardar el tema');
        }
        
    } else {
        // Cambiar a tema claro
        body.setAttribute('data-bs-theme', 'light');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
        
        // Quitar estilos oscuros
        removeDarkTheme();
        
        // Guardar preferencia
        try {
            localStorage.setItem('theme', 'light');
        } catch(e) {
            console.log('No se pudo guardar el tema');
        }
    }
}

function applyDarkTheme() {
    // Crear estilos para tema oscuro
    let darkStyles = document.getElementById('dark-theme-styles');
    
    if (!darkStyles) {
        darkStyles = document.createElement('style');
        darkStyles.id = 'dark-theme-styles';
        document.head.appendChild(darkStyles);
    }
    
    // Detectar si estamos en productos.html para aplicar estilos específicos
    const isProductsPage = window.location.pathname.includes('productos.html') || 
                          document.querySelector('.main-container') !== null;
    
    if (isProductsPage) {
        // Estilos específicos para productos.html
        darkStyles.textContent = `
            /* Tema Oscuro para productos.html */
            body[data-bs-theme="dark"] {
                background: linear-gradient(135deg, #1a1a1a, #2d3436) !important;
            }
            
            [data-bs-theme="dark"] .language-selector {
                background: rgba(0, 0, 0, 0.9) !important;
            }
            
            [data-bs-theme="dark"] .main-container {
                background: rgba(45, 52, 54, 0.95) !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .header {
                background: linear-gradient(135deg, #2d3436, #636e72) !important;
            }
            
            [data-bs-theme="dark"] .nav-pills .nav-link {
                background: #2d3436 !important;
                color: #ffffff !important;
                border-color: #74b9ff !important;
            }
            
            [data-bs-theme="dark"] .nav-pills .nav-link.active {
                background: linear-gradient(135deg, #74b9ff, #0984e3) !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .nav-pills .nav-link:hover {
                background: #636e72 !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .product-card {
                background: #636e72 !important;
                color: #ffffff !important;
                border: 2px solid #74b9ff !important;
            }
            
            [data-bs-theme="dark"] .product-card .card-body {
                background: rgba(45, 52, 54, 0.8) !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .featured-card {
                background: linear-gradient(135deg, #2d3436, #74b9ff) !important;
            }
            
            [data-bs-theme="dark"] .featured-card .card-body {
                background: rgba(45, 52, 54, 0.9) !important;
            }
            
            [data-bs-theme="dark"] .crazy-card {
                background: linear-gradient(135deg, #2d3436, #636e72) !important;
            }
            
            [data-bs-theme="dark"] .product-title {
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .product-description {
                color: #ddd !important;
            }
            
            [data-bs-theme="dark"] .product-price {
                color: #74b9ff !important;
            }
            
            [data-bs-theme="dark"] .featured-card .product-price,
            [data-bs-theme="dark"] .crazy-card .product-price {
                color: #ffe066 !important;
            }
            
            [data-bs-theme="dark"] .disclaimer {
                background: rgba(116, 185, 255, 0.2) !important;
                border-color: #74b9ff !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] #categoryTabs {
                background-color: #2d3436 !important;
            }
            
            [data-bs-theme="dark"] .form-select {
                background-color: #2d3436 !important;
                border-color: #74b9ff !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .text-white {
                color: #ffffff !important;
            }
        `;
    } else {
        // Estilos para otras páginas (index.html, login.html, register.html)
        darkStyles.textContent = `
            /* Tema Oscuro para páginas principales */
            body[data-bs-theme="dark"] {
                background-color: #2d3436 !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .navbar {
                background-color: #2d3436 !important;
            }
            
            [data-bs-theme="dark"] .navbar-brand,
            [data-bs-theme="dark"] .nav-link {
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .hero-section {
                background: linear-gradient(135deg, #2d3436, #636e72) !important;
            }
            
            [data-bs-theme="dark"] .card {
                background-color: #636e72 !important;
                color: #ffffff !important;
                border: 1px solid #74b9ff !important;
            }
            
            [data-bs-theme="dark"] .product-card,
            [data-bs-theme="dark"] .category-card,
            [data-bs-theme="dark"] .login-card,
            [data-bs-theme="dark"] .register-card {
                background-color: #636e72 !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .product-title,
            [data-bs-theme="dark"] .card-title {
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .product-description,
            [data-bs-theme="dark"] .card-text {
                color: #ddd !important;
            }
            
            [data-bs-theme="dark"] .bg-light {
                background-color: #2d3436 !important;
            }
            
            [data-bs-theme="dark"] .text-muted {
                color: #bbb !important;
            }
            
            [data-bs-theme="dark"] .filter-section {
                background: linear-gradient(45deg, #2d3436, #636e72) !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .form-control,
            [data-bs-theme="dark"] .form-select {
                background-color: #2d3436 !important;
                border-color: #74b9ff !important;
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .form-control:focus,
            [data-bs-theme="dark"] .form-select:focus {
                background-color: #2d3436 !important;
                border-color: #0984e3 !important;
                color: #ffffff !important;
                box-shadow: 0 0 0 0.2rem rgba(116, 185, 255, 0.25) !important;
            }
            
            [data-bs-theme="dark"] .form-label,
            [data-bs-theme="dark"] .form-text {
                color: #ffffff !important;
            }
            
            [data-bs-theme="dark"] .footer {
                background-color: #1a1a1a !important;
            }
        `;
    }
}

function removeDarkTheme() {
    // Quitar estilos de tema oscuro
    const darkStyles = document.getElementById('dark-theme-styles');
    if (darkStyles) {
        darkStyles.remove();
    }
}

// Inicializar tema al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar tema guardado
    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem('theme') || 'light';
    } catch(e) {
        console.log('No se pudo acceder a localStorage');
    }
    
    // Aplicar tema inicial
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    body.setAttribute('data-bs-theme', savedTheme);
    
    if (themeIcon) {
        if (savedTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            applyDarkTheme();
        } else {
            themeIcon.className = 'fas fa-moon';
            removeDarkTheme();
        }
    }
});

// Hacer la función global para que funcione con onclick
window.toggleTheme = toggleTheme;