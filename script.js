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

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.quantity}x ${item.product}`;
        
        // Botão de remover item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️'; // Ícone de lixeira
        deleteButton.setAttribute('aria-label', `Remover ${item.product} do carrinho`);
        deleteButton.addEventListener('click', () => {
            cart.splice(index, 1); // Remove o item do carrinho
            updateCart(); // Atualiza a visualização do carrinho
        });

        li.appendChild(deleteButton);
        cartItemsList.appendChild(li);

        // Atualize o preço total
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

    if (!name || !email) {
        alert('Por favor, preencha seu nome e e-mail.');
        return;
    }

    const whatsappMessage = `Olá, meu nome é ${name}. Meu e-mail é ${email}. Estou fazendo um pedido: ${orderDetails}.`;
    const whatsappURL = `https://wa.me/5517996780618?text=${encodeURIComponent(whatsappMessage)}`;

    // Exibir uma mensagem temporária na tela com detalhes do pedido
    const feedbackMessage = document.createElement('div');
    feedbackMessage.textContent = `Seu pedido: ${orderDetails}. Redirecionando para o WhatsApp...`;
    feedbackMessage.setAttribute('role', 'alert'); // Acessibilidade
    Object.assign(feedbackMessage.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ff6347',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: '1000',
        opacity: '0'
    });

    document.body.appendChild(feedbackMessage);
    setTimeout(() => {
        feedbackMessage.style.transition = 'opacity 0.5s';
        feedbackMessage.style.opacity = '1'; // Aparece suavemente
    }, 0);

    setTimeout(() => {
        feedbackMessage.remove(); // Remover após alguns segundos
    }, 3000); // 3 segundos

    // Limpa o carrinho após o pedido
    cart.length = 0; // Limpa o carrinho
    updateCart(); // Atualiza a visualização do carrinho

    // Redireciona para o WhatsApp
    window.open(whatsappURL, '_blank').focus();
});
