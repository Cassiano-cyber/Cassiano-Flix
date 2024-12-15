<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explosão Crocante</title>
    <meta name="description" content="Descubra nossos salgados personalizados, salgados veganos e pizzas deliciosas na Explosão Crocante.">
    <meta name="keywords" content="salgados, veganos, pizzas, Cassiano Flix">
    <meta name="author" content="Cassiano Flix">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Dramaturgia+Cuba&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet">
    <!-- Adicione estas linhas no <head> do seu HTML -->
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"></script>
    <script>
      // Configurações do Firebase
      const firebaseConfig = {
        apiKey: "AIzaSyCgFRQYluZdsWMizR1ESBn_X9Aq_IIIOZk",
        authDomain: "sistema-de-comentarios-972e6.firebaseapp.com",
        projectId: "sistema-de-comentarios-972e6",
        storageBucket: "sistema-de-comentarios-972e6.firebasestorage.app",
        messagingSenderId: "872216046988",
        appId: "1:872216046988:web:00f25480ca246b439bfaa9"
      };

      // Inicializar Firebase
      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();
    </script>
</head>
<body>
    <header>
        <h1 class="dramaturgia-cu-header">Explosão Crocante</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Produtos</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </nav>
    </header>
    <section id="home">
        <h2 class="dramaturgia-cu-subheader">Bem-vindo à Explosão Crocante!</h2>
        <p>Descubra nossos salgados personalizados, salgados veganos e pizzas deliciosas.</p>
        <img src="https://img.restaurantguru.com/rac9-Explosao-De-Sabores-menu.jpg" alt="Logo" class="loaded">
    </section>
    <section id="products">
        <h2 class="dramaturgia-cu-subheader">Nossos Produtos</h2>
        <p class="product-info">Clique nas imagens abaixo para visualizar as opções de produtos e fazer o seu pedido!</p>
        <div class="product-category">
            <h3 class="dramaturgia-cu-category">Salgados Personalizados</h3>
            <a href="https://cassiano-cyber.github.io/site-salgados/" target="_blank">
                <img src="https://manealimentos.com.br/wp-content/uploads/2020/09/salgado-esquina-comprar.jpg" alt="Salgados Personalizados" class="loaded">
            </a>
            <p>O seu salgado ao seu gosto.</p>
        </div>
        <div class="product-category">
            <h3 class="dramaturgia-cu-category">Salgados Veganos</h3>
            <a href="https://cassiano-cyber.github.io/site-veganos/" target="_blank">
                <img src="https://th.bing.com/th/id/OIP.0d4JLumHvADzzxQK83BGBwHaE8?rs=1&pid=ImgDetMain" alt="Salgados Veganos" class="loaded">
            </a>
            <p>Utilizamos ingredientes veganos frescos para criar salgados deliciosos e saudáveis.</p>
        </div>
        <div class="product-category">
            <h3 class="dramaturgia-cu-category">Pizzas</h3>
            <a href="https://cassiano-cyber.github.io/site-pizzas/" target="_blank">
                <img src="https://www.designi.com.br/images/preview/10006042.jpg" alt="Preparando Pizza" class="loaded">
            </a>
            <p>Escolha seus ingredientes favoritos, aqui a autonomia é do cliente!</p>
        </div>
    </section>
    <section id="contact">
        <h2 class="dramaturgia-cu-subheader">Contato</h2>
        <p>Tem alguma dúvida ou quer fazer um pedido especial? Entre em contato conosco e responderemos o mais rápido possível!</p>
        <form action="https://wa.me/5517996780618" method="get" target="_blank" class="contact-form">
            <div class="form-group">
                <label for="contact-name">Nome:</label>
                <input type="text" id="contact-name" name="contact-name" required autocomplete="name">
            </div>
            <div class="form-group">
                <label for="contact-email">Email:</label>
                <input type="email" id="contact-email" name="contact-email" required autocomplete="email">
            </div>
            <div class="form-group">
                <label for="contact-message">Mensagem:</label>
                <textarea id="contact-message" name="message" required></textarea>
            </div>
            <button type="submit" class="contact-button">Enviar</button>
        </form>
    </section>
    <section id="avaliacoes" class="menu">
      <h2>Avaliações de Clientes</h2>
      <div id="avaliacoes-lista"></div>
      <h3>Deixe sua Avaliação!</h3>
      <form id="avaliacao-form">
        <input type="text" id="nome" placeholder="Seu Nome" required>
        <textarea id="comentario" placeholder="Seu Comentário" required></textarea>
        <button type="submit">Enviar Avaliação</button>
      </form>
    </section>
    <footer>
        <p>© 2024 Explosão Crocante. Todos os direitos reservados.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
