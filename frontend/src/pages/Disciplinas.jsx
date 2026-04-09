import CrudPage from '../components/CrudPage.jsx';

const fields = [
  { name: 'nome', label: 'Nome', required: true, placeholder: 'Ex: Matemática' },
  { name: 'descricao', label: 'Descrição', placeholder: 'Ex: Álgebra e geometria...' },
  { name: 'dataInicio', label: 'Data de Início', type: 'date' },
  { name: 'dataFim', label: 'Data de Fim', type: 'date' },
];

const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'descricao', label: 'Descrição', render: (item) => item.descricao || '—' },
  { key: 'dataInicio', label: 'Início', render: (item) => item.dataInicio ? new Date(item.dataInicio).toLocaleDateString('pt-BR') : '—' },
  { key: 'dataFim', label: 'Fim', render: (item) => item.dataFim ? new Date(item.dataFim).toLocaleDateString('pt-BR') : '—' },
];

export default function Disciplinas() {
  return (
    <CrudPage
      title="Disciplinas"
      icon="📚"
      endpoint="/disciplina"
      fields={fields}
      columns={columns}
      emptyMessage="Nenhuma disciplina cadastrada ainda."
    />
  );
}
