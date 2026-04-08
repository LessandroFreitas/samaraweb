import CrudPage from '../components/CrudPage.jsx';

const fields = [
  { name: 'nome', label: 'Nome da Disciplina', required: true, placeholder: 'Ex: Matemática' },
  { name: 'cargaHoraria', label: 'Carga Horária (h)', type: 'number', placeholder: 'Ex: 60' },
];

const columns = [
  { key: 'nome', label: 'Nome' },
  {
    key: 'cargaHoraria', label: 'Carga Horária',
    render: (item) => item.cargaHoraria ? `${item.cargaHoraria}h` : '—'
  },
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
