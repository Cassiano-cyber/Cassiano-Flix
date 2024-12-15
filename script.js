document.addEventListener('DOMContentLoaded', function() {
  const avaliacoesLista = document.getElementById('avaliacoes-lista');
  const avaliacaoForm = document.getElementById('avaliacao-form');

  // Carregar avaliações do Firestore
  db.collection('avaliacoes').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    avaliacoesLista.innerHTML = '';
    snapshot.forEach(doc => {
      const avaliacao = doc.data();
      const div = document.createElement('div');
      div.classList.add('avaliacao');
      div.innerHTML = `<strong>${avaliacao.nome}</strong><p>${avaliacao.comentario}</p>`;
      avaliacoesLista.appendChild(div);
    });
  });

  // Enviar nova avaliação
  avaliacaoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const comentario = document.getElementById('comentario').value;

    db.collection('avaliacoes').add({
      nome: nome,
      comentario: comentario,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      avaliacaoForm.reset();
    }).catch(error => {
      console.error('Erro ao enviar avaliação: ', error);
    });
  });
});

