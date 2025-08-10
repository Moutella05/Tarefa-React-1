import React from "react";
import getRelativeTime from "../../src/utils/Hora";
import Comentario from "./Comentario";
import "./Feed.css";
import { useComentarios } from "../../src/context/ComentarioContext";
import { type Comentario as ComentarioType, ComentariosProvider } from '../../src/context/ComentarioContext'

interface CardProps {
  id: number;
  nome: string;
  profissao: string;
  comentario: string;
  imagem: string;
}

export interface Pessoa {
  id: number;
  nome: string;
  profissao: string;
  comentario: string;
  imagem: string;
  tempo: Date;
  comentarios: ComentarioType[]
}

function FeedContent(props: CardProps) {
  const { comentarios, adicionarComentario } = useComentarios();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const novoComentario = (form.elements.namedItem('comentario') as HTMLTextAreaElement).value;
    adicionarComentario(novoComentario);
    form.reset();
  }

  return (
    <div className="container">
      <div className="feed-container">
        <div className="top">
          <div className="Info">
            <div className="Img">
              <img src={props.imagem} alt="Profile" />
            </div>
            <div className="Info-text">
              <h4>{props.nome}</h4>
              <h5 className="profissao">{props.profissao}</h5>
            </div>
          </div>
          <span className="tempo">
            {getRelativeTime(new Date ("2024-01-09T19:45:00.000Z"), "Publicado há ")}
          </span>
        </div>
        <div className="Comment">
          <p>{props.comentario}</p>
        </div>
      </div>

      <form className="Commit" onSubmit={handleSubmit}>
        <h5>Deixe seu feedback</h5>
        <textarea
          name="comentario"
          placeholder="Escreva um comentário..."
          required
        />
        <button type="submit">Comentar</button>
      </form>
      <div className="comments-list">
        {comentarios.map((comentario) => (
          <Comentario key={comentario.id} comentario={comentario} />
        ))}
      </div>
    </div>
  );
}

export default function Feed(props: CardProps) {
  return (
    <ComentariosProvider pessoaId={props.id}>
      <FeedContent {...props} />
    </ComentariosProvider>
  )
}
