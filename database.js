const databaseKey = 'database';

function adicionarRelatorio(relatorio) {
  const database = carregarDatabase();
  database.relatorios.push(relatorio);
  salvarDatabase(database);
}

function carregarDatabase() {
  try {
    const data = localStorage.getItem(databaseKey);
    return data ? JSON.parse(data) : { relatorios: [] };
  } catch (error) {
    console.error('Erro ao carregar o banco de dados:', error);
    return { relatorios: [] };
  }
}

function salvarDatabase(database) {
  try {
    const data = JSON.stringify(database);
    localStorage.setItem(databaseKey, data);
    console.log('Banco de dados atualizado com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar o banco de dados:', error);
  }
}

export { adicionarRelatorio };
