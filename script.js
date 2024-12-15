document.addEventListener('DOMContentLoaded', function() {
  const avaliacoesLista = document.getElementById('avaliacoes-lista');
  const avaliacaoForm = document.getElementById('avaliacao-form');

  // Carregar avaliações do Firestore
  const q = query(collection(db, 'avaliacoes'), orderBy('nome', 'desc'));
  onSnapshot(q, snapshot => {
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

    addDoc(collection(db, 'avaliacoes'), {
      nome: nome,
      comentario: comentario
    }).then(() => {
      avaliacaoForm.reset();
    }).catch(error => {
      console.error('Erro ao enviar avaliação: ', error);
    });
  });
});
