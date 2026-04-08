import CrudPage from '../components/CrudPage.jsx';

const fields = [
  { name: 'bio', label: 'Bio / Descrição', placeholder: 'Ex: Estudante de engenharia...' },
  { name: 'foto', label: 'URL da Foto', placeholder: 'https://...' },
];

const columns = [
  {
    key: 'foto', label: 'Foto',
    render: (item) => item.foto
      ? <img src={item.foto} alt="foto" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
      : <span style={{ fontSize: 24 }}>👤</span>
  },
  {
    key: 'bio', label: 'Bio',
    render: (item) => item.bio
      ? <span style={{ color: 'var(--text2)' }}>{item.bio.slice(0, 60)}{item.bio.length > 60 ? '...' : ''}</span>
      : <span style={{ color: 'var(--text3)' }}>Sem bio</span>
  },
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
