import Header from '../components/Header'
import Profile_Side from '../components/Main/Profile_Side'
import Feed, { type Pessoa } from '../components/Main/Feed'
import './App.css'

export default function App() {
  const pessoas: Pessoa[] = JSON.parse(localStorage.getItem("Posts") || "[]");
  return (
    <>
      <Header/>
      <div className='Main'>
        <Profile_Side/>
        <div className='Cards'>
          {pessoas.map(pessoa => {
            return <Feed key={pessoa.id} id={pessoa.id} nome={pessoa.nome} profissao={pessoa.profissao} imagem={pessoa.imagem} comentario={pessoa.comentario}/>
          })}
        </div>
      </div>
    </>
  )
}

