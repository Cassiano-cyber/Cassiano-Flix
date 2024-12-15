// Importar a função necessária para inicializar o Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgFRQYluZdsWMizR1ESBn_X9Aq_IIIOZk",
  authDomain: "sistema-de-comentarios-972e6.firebaseapp.com",
  projectId: "sistema-de-comentarios-972e6",
  storageBucket: "sistema-de-comentarios-972e6.firebasestorage.app",
  messagingSenderId: "872216046988",
  appId: "1:872216046988:web:00f25480ca246b439bfaa9"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);  // Inicializa o Firebase App

// Inicializar o Firestore
const db = getFirestore(app);  // Agora o Firestore usa a instância do Firebase

document.addEventListener('DOMContentLoaded', function() {
  const avaliacoesLista = document.getElementById('avaliacoes-lista');
  const avaliacaoForm = document.getElementById('avaliacao-form');

  // Carregar avaliações do Firestore
  const q = query(collection(db, 'avaliacoes'), orderBy('nome', 'desc'));

  onSnapshot(q, snapshot => {
    avaliacoesLista.innerHTML = ''; // Limpa a lista antes de adicionar novos dados
    snapshot.forEach(doc => {
      const avaliacao = doc.data();
      const div = document.createElement('div');
      div.classList.add('avaliacao');
      div.innerHTML = `<strong>${avaliacao.nome}</strong><p>${avaliacao.comentario}</p>`;
      avaliacoesLista.appendChild(div);
    });
  });

  // Enviar nova avaliação
  avaliacaoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const comentario = document.getElementById('comentario').value;

    try {
      await addDoc(collection(db, 'avaliacoes'), {
        nome: nome,
        comentario: comentario
      });
      avaliacaoForm.reset(); // Limpa o formulário após envio
    } catch (error) {
      console.error('Erro ao enviar avaliação: ', error);
    }
  });
});
