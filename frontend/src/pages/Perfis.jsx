import CrudPage from '../components/CrudPage.jsx';

const fields = [
  { name: 'matricula', label: 'Matrícula', placeholder: 'Ex: 2024001' },
  { name: 'telefone', label: 'Telefone', placeholder: 'Ex: (11) 99999-9999' },
  { name: 'endereco', label: 'Endereço', placeholder: 'Ex: Rua das Flores, 123' },
];

const columns = [
  { key: 'matricula', label: 'Matrícula', render: (item) => item.matricula || '—' },
  { key: 'telefone', label: 'Telefone', render: (item) => item.telefone || '—' },
  { key: 'endereco', label: 'Endereço', render: (item) => item.endereco || '—' },
  { key: 'aluno', label: 'Aluno', render: (item) => item.aluno?.nome || '—' },

];

export default function Perfis() {
  return (
    <CrudPage
      title="Perfis"
      icon="👤"
      endpoint="/perfil"
      fields={fields}
      columns={columns}
      emptyMessage="Nenhum perfil cadastrado ainda."
    />
  );
}
