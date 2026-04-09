import CrudPage from '../components/CrudPage.jsx';

const fields = [
  { name: 'nome', label: 'Nome', required: true, placeholder: 'Ex: Maria Oliveira' },
  { name: 'idade', label: 'Idade', type: 'number', required: true, min: 18, max: 99, placeholder: 'Ex: 35' },
];

const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'idade', label: 'Idade', render: (item) => item.idade ? `${item.idade} anos` : '—' },
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
