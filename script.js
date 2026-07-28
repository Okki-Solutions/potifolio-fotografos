// ===== DADOS DA GALERIA =====
const imagensGaleria = [
    {
        src: 'https://images.unsplash.com/photo-1536240474400-4d6f8a5b3e3a?q=80&w=1974&auto=format&fit=crop',
        titulo: 'Ensaio em preto e branco'
    },
    {
        src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1974&auto=format&fit=crop',
        titulo: 'Moda e movimento'
    },
    {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
        titulo: 'Casamento clássico'
    },
    {
        src: 'https://images.unsplash.com/photo-1584047991171-0e4f1f7f6ff9?q=80&w=1974&auto=format&fit=crop',
        titulo: 'Retrato de luxo'
    },
    {
        src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1974&auto=format&fit=crop',
        titulo: 'Arquitetura minimalista'
    },
    {
        src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop',
        titulo: 'Natureza e elegância'
    },
    {
        src: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=1974&auto=format&fit=crop',
        titulo: 'Luz dramática'
    },
    {
        src: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1974&auto=format&fit=crop',
        titulo: 'Fotografia de produto'
    }
];

// ===== DADOS DOS DEPOIMENTOS =====
const depoimentos = [
    {
        foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
        nome: 'Carlos M.',
        cargo: 'CEO, Agência V',
        texto: 'A Lumière transformou nossa campanha de lançamento. Fotos que transmitem exatamente o luxo que nossa marca representa. Profissionais excepcionais!'
    },
    {
        foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
        nome: 'Fernanda L.',
        cargo: 'Arquiteta',
        texto: 'Contratei para um ensaio de interiores e fiquei impressionada com a sensibilidade para captar a luz e a atmosfera dos espaços. Recomendo de olhos fechados.'
    },
    {
        foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
        nome: 'Ricardo S.',
        cargo: 'Editor de Moda',
        texto: 'Trabalho com diversos fotógrafos, mas a Lumière tem um olhar único. Cada clique parece uma obra de arte. Meus clientes adoram!'
    }
];

// ===== HERO SLIDESHOW =====
const heroSlides = [
    {
        src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop',
        alt: 'Cena de luxo em luz natural'
    },
    {
        src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop',
        alt: 'Estilo elegante e sofisticado'
    },
    {
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2000&auto=format&fit=crop',
        alt: 'Retrato elegante com iluminação cinematográfica'
    },
    {
        src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop',
        alt: 'Momento sofisticado com textura sofisticada'
    }
];

const heroImages = document.querySelectorAll('.hero-image');
let heroActiveSlide = 0;

function iniciarHeroSlideshow() {
    if (!heroImages.length) return;

    heroImages.forEach((img, index) => {
        const slide = heroSlides[index % heroSlides.length];
        img.src = slide.src;
        img.alt = slide.alt;
        img.classList.toggle('hero-image--active', index === 0);
    });

    setInterval(() => {
        const nextSlideIndex = (heroActiveSlide + 1) % heroSlides.length;
        const hiddenImage = heroImages[0].classList.contains('hero-image--active') ? heroImages[1] : heroImages[0];
        const slide = heroSlides[nextSlideIndex];

        hiddenImage.src = slide.src;
        hiddenImage.alt = slide.alt;
        heroImages.forEach(img => img.classList.remove('hero-image--active'));
        hiddenImage.classList.add('hero-image--active');
        heroActiveSlide = nextSlideIndex;
    }, 3000);
}

// ===== FUNÇÃO PARA CARREGAR GALERIA =====
function carregarGaleria() {
    const grid = document.getElementById('galeriaGrid');
    if (!grid) return;

    grid.innerHTML = imagensGaleria.map((img, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${img.src}" alt="${img.titulo}" loading="lazy" />
            <div class="overlay"><span>${img.titulo}</span></div>
        </div>
    `).join('');

    // Adicionar evento de clique para abrir lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            abrirLightbox(index);
        });
    });
}

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxLegenda = document.getElementById('lightboxLegenda');
const fecharLightbox = document.querySelector('.lightbox-fechar');

function abrirLightbox(index) {
    const img = imagensGaleria[index];
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.titulo;
    lightboxLegenda.textContent = img.titulo;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharLightboxFunc() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

fecharLightbox.addEventListener('click', fecharLightboxFunc);

// Fechar ao clicar fora da imagem (no fundo)
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        fecharLightboxFunc();
    }
});

// Fechar com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        fecharLightboxFunc();
    }
});

// ===== FUNÇÃO PARA CARREGAR DEPOIMENTOS =====
function carregarDepoimentos() {
    const grid = document.getElementById('depoimentosGrid');
    if (!grid) return;

    grid.innerHTML = depoimentos.map(d => `
        <div class="depoimento-card">
            <p>“${d.texto}”</p>
            <div class="cliente">
                <img src="${d.foto}" alt="${d.nome}" loading="lazy" />
                <div class="cliente-info">
                    <strong>${d.nome}</strong>
                    <span>${d.cargo}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== MENU MOBILE =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // Alternar ícone
        this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Fechar menu ao clicar em um link (em mobile)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });
}

// ===== NEWSLETTER (simulação) =====
const formNews = document.getElementById('newsletterForm');
if (formNews) {
    formNews.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input[type="email"]');
        const consentimento = this.querySelector('input[name="consentimento"]');
        if (input && input.value.trim() !== '' && consentimento && consentimento.checked) {
            alert('Inscrição confirmada. Usaremos seu e-mail somente para a newsletter. Você pode cancelar a qualquer momento pela Política de Privacidade.');
            this.reset();
        } else {
            alert('Informe um e-mail válido e aceite o uso dele para receber a newsletter.');
        }
    });
}

// ===== INICIAR APLICAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    carregarGaleria();
    carregarDepoimentos();
    iniciarHeroSlideshow();
});
