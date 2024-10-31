// Carrinho de compras
const cart = [];
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Adiciona um evento de clique ao botão "Adicionar ao Carrinho"
document.getElementById('add-to-cart').addEventListener('click', () => {
    const productElement = document.getElementById('order-product');
    const quantityElement = document.getElementById('order-quantity');
    
    if (!productElement || !quantityElement) {
        console.error('Elemento não encontrado');
        return;
    }

    const product = productElement.value;
    const quantity = parseInt(quantityElement.value, 10);
    
    if (quantity <= 0) {
        alert('Por favor, selecione uma quantidade válida.');
        return;
    }

    const item = { product, quantity };
    cart.push(item);
    updateCart();
});

// Atualiza a visualização do carrinho
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.quantity}x ${item.product}`;
        cartItemsList.appendChild(li);

        // Atualize o preço total (valores fictícios)
        switch (item.product) {
            case 'salgados':
                total += item.quantity * 10;
                break;
            case 'veganos':
                total += item.quantity * 12;
                break;
            case 'pizzas':
                total += item.quantity * 20;
                break;
            default:
                console.warn(`Produto desconhecido: ${item.product}`);
        }
    });

    totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Adiciona um evento ao botão "Finalizar Pedido"
document.getElementById('place-order').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const orderDetails = cart.map(item => `${item.quantity} x ${item.product}`).join(', ');
    const nameElement = document.getElementById('order-customer-name');
    const emailElement = document.getElementById('order-customer-email');
    
    const name = nameElement.value;
    const email = emailElement.value;
    const whatsappMessage = `Olá, meu nome é ${name}. Meu e-mail é ${email}. Estou fazendo um pedido: ${orderDetails}.`;
    const whatsappURL = `https://wa.me/5517996780618?text=${encodeURIComponent(whatsappMessage)}`;

    // Exibir uma mensagem temporária na tela com detalhes do pedido
    const feedbackMessage = document.createElement('div');
    feedbackMessage.textContent = `Seu pedido: ${orderDetails}. Redirecionando para o WhatsApp...`;
    Object.assign(feedbackMessage.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ff6347',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: '1000'
    });
    document.body.appendChild(feedbackMessage);

    // Redirecionar automaticamente para o WhatsApp após 1 segundo
    setTimeout(() => {
        window.open(whatsappURL, '_blank'); // Abre o WhatsApp em nova aba
        cart.length = 0; // Limpa o carrinho
        updateCart(); // Atualiza a visualização do carrinho
        document.body.removeChild(feedbackMessage); // Remove a mensagem de feedback
    }, 1000); // 1000 ms = 1 segundo
});

// Realce do item ativo na navbar
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        }
    });
});
