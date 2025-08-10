import React, { createContext, useContext, useState, useEffect } from "react";
import type { Pessoa } from '../../components/Main/Feed'

export interface Comentario {
  id: number
  curtido: boolean
  nome: string
  imagem: string
  texto: string
  likes: number
  tempo: Date;
}


interface ComentariosContextProps {
  comentarios: Comentario[];
  adicionarComentario: (texto: string) => void;
  deletarComentario: (id: number) => void;
  curtirComentario: (id: number) => void;
}

const ComentariosContext = createContext<ComentariosContextProps | undefined>(undefined);

export function useComentarios() {
  const context = useContext(ComentariosContext);
  if (!context) throw new Error("useComentarios deve ser usado dentro do ComentariosProvider");
  return context;
}

export const ComentariosProvider: React.FC<{ pessoaId: number; children: React.ReactNode }> = ({ pessoaId, children }) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  useEffect(() => {
    const pessoas: Pessoa[] = JSON.parse(localStorage.getItem("Posts") || "[]");
    const pessoa = pessoas.find((item) => item.id === pessoaId);
    setComentarios(pessoa?.comentarios || []);
  }, [pessoaId]);

  function persist(comentariosAtualizados: Comentario[]) {
    const comments: Pessoa[] = JSON.parse(localStorage.getItem("Posts") || "[]");
    const pessoaIndex = comments.findIndex((item) => item.id === pessoaId);
    if (pessoaIndex !== -1) {
      comments[pessoaIndex].comentarios = comentariosAtualizados;
      localStorage.setItem("Posts", JSON.stringify(comments));
    }
  }

  function adicionarComentario(texto: string) {
    const atualizados = [...comentarios, {
      id: comentarios.length + 1,
      nome: "Convidada",
      imagem: "https://imgs.search.brave.com/xSB-fQxG3EbWNHMaawpoj29Y6PUFe4dSX5QIp--RjUc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/MDQ4Njg4OS9wdC9m/b3RvL2NhbmRpZC1w/b3J0cmFpdC1vZi15/b3VuZy1taWRkbGUt/ZWFzdGVybi1kaWdp/dGFsLW5hdGl2ZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/czl4X1ZTU2xpMTB1/R3dSOVpGeVpDMnBh/Y29KMHFDWWsxVnFx/cWExcEFSOD0",
      texto,
      curtido: false,
      likes: 0,
      tempo: new Date()
    }];
    setComentarios(atualizados);
    persist(atualizados);
  }

  function curtirComentario(id: number) {
    setComentarios(comentarios.map(comentario => {
      if (comentario.id === id) {
        return {
          ...comentario,
          likes: comentario.curtido ? comentario.likes - 1 : comentario.likes + 1,
          curtido: !comentario.curtido,
        }
      }
      return comentario
    }))
  }

  function deletarComentario(id: number) {
    const atualizados = comentarios.filter(c => c.id !== id);
    setComentarios(atualizados);
    persist(atualizados);
  }

  return (
    <ComentariosContext.Provider value={{ comentarios, adicionarComentario, deletarComentario, curtirComentario }}>
      {children}
    </ComentariosContext.Provider>
  );
};