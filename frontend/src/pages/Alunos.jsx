import CrudPage from '../components/CrudPage.jsx';

const fields = [
  { name: 'nome', label: 'Nome', required: true, placeholder: 'Ex: João da Silva' },
  { name: 'idade', label: 'Idade', type: 'number', required: true, min: 15, max: 99, placeholder: 'Entre 15 e 99' },
];

const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'idade', label: 'Idade', render: (item) => `${item.idade} anos` },
  {
    key: 'perfil', label: 'Perfil',
    render: (item) => item.perfil
      ? <span className="badge badge-purple">Vinculado</span>
      : <span className="badge badge-red">Sem perfil</span>
  },
];

export default function Alunos() {
  return (
    <CrudPage
      title="Alunos"
      icon="🎓"
      endpoint="/aluno"
      fields={fields}
      columns={columns}
      emptyMessage="Nenhum aluno cadastrado ainda."
    />
  );
}
