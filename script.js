// Carrinho de compras
const cart = [];
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Adiciona um evento de clique ao botão "Adicionar ao Carrinho"
document.getElementById('add-to-cart').addEventListener('click', () => {
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);

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

    sendEmail(orderDetails); // Chama a função para enviar o email
    cart.length = 0; // Limpa o carrinho
    updateCart(); // Atualiza a visualização do carrinho
});

// Função para enviar o email com os detalhes do pedido
function sendEmail(orderDetails) {    const name = document.getElementById('name').value; // Obtém o nome do formulário
    const email = document.getElementById('email').value; // Obtém o email do formulário

    const templateParams = {
        name: name,
        email: email,
        order: orderDetails
    };

    emailjs.send('service_owmgfdk', 'template_your_template_id', templateParams)
        .then((response) => {
            console.log('Pedido enviado com sucesso!', response.status, response.text);
            alert('Seu pedido foi enviado com sucesso!'); // Mensagem de sucesso
        }, (error) => {
            console.error('Erro ao enviar o pedido:', error);
            alert('Ocorreu um erro ao enviar seu pedido. Tente novamente mais tarde.'); // Mensagem de erro
        });
}

   
