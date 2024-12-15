// Carregar o SDK do Firebase de maneira tradicional (sem módulos)
var firebaseConfig = {
  apiKey: "AIzaSyCgFRQYluZdsWMizR1ESBn_X9Aq_IIIOZk",
  authDomain: "sistema-de-comentarios-972e6.firebaseapp.com",
  projectId: "sistema-de-comentarios-972e6",
  storageBucket: "sistema-de-comentarios-972e6.firebasestorage.app",
  messagingSenderId: "872216046988",
  appId: "1:872216046988:web:00f25480ca246b439bfaa9"
};

// Inicializar o Firebase (usando o SDK tradicional)
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
var db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
  var avaliacoesLista = document.getElementById('avaliacoes-lista');
  var avaliacaoForm = document.getElementById('avaliacao-form');

  // Carregar avaliações do Firestore
  var avaliacoesRef = db.collection('avaliacoes').orderBy('nome', 'desc');

  avaliacoesRef.onSnapshot(function(snapshot) {
    avaliacoesLista.innerHTML = ''; // Limpa a lista antes de adicionar novos dados
    snapshot.forEach(function(doc) {
      var avaliacao = doc.data();
      var div = document.createElement('div');
      div.classList.add('avaliacao');
      div.innerHTML = `<strong>${avaliacao.nome}</strong><p>${avaliacao.comentario}</p>`;
      avaliacoesLista.appendChild(div);
    });
  });

  // Enviar nova avaliação
  avaliacaoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var nome = document.getElementById('nome').value;
    var comentario = document.getElementById('comentario').value;

    // Enviar dados para o Firestore
    db.collection('avaliacoes').add({
      nome: nome,
      comentario: comentario
    }).then(function() {
      avaliacaoForm.reset(); // Limpa o formulário após envio
    }).catch(function(error) {
      console.error('Erro ao enviar avaliação: ', error);
    });
  });
});
