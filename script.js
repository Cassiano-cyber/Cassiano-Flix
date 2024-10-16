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
    if (!cartItemsList || !totalPriceElement) {
        console.error('Elemento não encontrado');
        return;
    }

    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.quantity}x ${item.product}`;

        // Animação de entrada para o item do carrinho
        li.style.opacity = 0; // Torna invisível inicialmente
        li.style.transform = 'translateY(-10px)'; // Inicia deslocado
        cartItemsList.appendChild(li);

        // Animação
        setTimeout(() => {
            li.style.opacity = 1; // Torna visível
            li.style.transform = 'translateY(0)'; // Retorna ao lugar original
        }, 10); // Atraso pequeno para ativar a animação

        // Atualize o preço total (valores fictícios)
        if (item.product === 'salgados') total += item.quantity * 10;
        if (item.product === 'veganos') total += item.quantity * 12;
        if (item.product === 'pizzas') total += item.quantity * 20;
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

    if (!nameElement || !emailElement) {
        console.error('Elemento não encontrado');
        return;
    }

    const name = nameElement.value;
    const email = emailElement.value;
    const whatsappMessage = `Olá, meu nome é ${name}. Meu e-mail é ${email}. Estou fazendo um pedido: ${orderDetails}.`;
    const whatsappURL = `https://wa.me/5517996780618?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank'); // Abre o WhatsApp em nova aba
    cart.length = 0; // Limpa o carrinho
    updateCart(); // Atualiza a visualização do carrinho
});
