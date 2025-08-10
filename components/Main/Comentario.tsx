import Trash from "../../src/assets/Trash.svg";
import getRelativeTime from "../../src/utils/Hora";
import {
  useComentarios,
  type Comentario,
} from "../../src/context/ComentarioContext";
import likeAzul from "../../src/assets/Like blue.svg";
import likePreto from "../../src/assets/Like black.svg";
import "./Comentario.css";

interface ComentarioProps {
  comentario: Comentario;
}

export default function Comentario({ comentario }: ComentarioProps) {
  const { deletarComentario, curtirComentario } = useComentarios();

  return (
    <div className="comment-card">
      <img className="fotoPessoa" src={comentario.imagem} />
      <div className="comment-content">
        <div>
          <div className="comment-header">
            <h5>{comentario.nome}</h5>
            <span className="tempoCard">
              {getRelativeTime(comentario?.tempo, "Publicado há ")}
            </span>
            <div>
              <p>{comentario.texto}</p>
            </div>
          </div>
          <div>
            <button
              className="delete-btn"
              onClick={() => deletarComentario(comentario.id)}
            >
              <img src={Trash} alt="Delete" />
            </button>
          </div>
        </div>
        <button
          className="like-btn"
          onClick={() => curtirComentario(comentario.id)}
          style={{
            color: comentario.curtido ? "#007DFA" : "#DDDDDD",
          }}
        >
          <img src={comentario.curtido ? likeAzul : likePreto}></img>Likes •{" "}
          {comentario.likes}
        </button>
      </div>
    </div>
  );
}
