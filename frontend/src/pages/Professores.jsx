import CrudPage from '../components/CrudPage.jsx';

const fields = [
  { name: 'nome', label: 'Nome', required: true, placeholder: 'Ex: Maria Oliveira' },
  { name: 'disciplina', label: 'Disciplina', placeholder: 'Ex: Matemática' },
];

const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'disciplina', label: 'Disciplina', render: (item) => item.disciplina || '—' },
];

export default function Professores() {
  return (
    <CrudPage
      title="Professores"
      icon="👨‍🏫"
      endpoint="/professor"
      fields={fields}
      columns={columns}
      emptyMessage="Nenhum professor cadastrado ainda."
    />
  );
}
