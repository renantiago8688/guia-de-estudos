import React from 'react';
import { useState, FormEvent } from 'react';

// 1. Definindo as Interfaces para os dados da Wikipedia
interface WikiThumbnail {
  source: string;
  width: number;
  height: number;
}

interface WikiUrls {
  desktop: {
    page: string;
  };
}

interface WikiSummaryResponse {
  title: string;
  extract: string;
  thumbnail?: WikiThumbnail; // Opcional, nem todo artigo tem foto
  content_urls: WikiUrls;
}

export default function PesquisaWikipedia() {
  const [termo, setTermo] = useState<string>('');
  const [resultado, setResultado] = useState<WikiSummaryResponse | null>(null);
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);

  // 2. Tipando o evento do formulário como FormEvent
  const buscarNaWikipedia = async (e: FormEvent) => {
    e.preventDefault();
    if (!termo.trim()) return;

    setCarregando(true);
    setErro('');
    setResultado(null);

    const termoFormatado = encodeURIComponent(termo.trim());
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${termoFormatado}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Artigo não encontrado. Tente digitar de outra forma.');
      }

      // 3. Indicando ao fetch o tipo esperado do JSON
      const data: WikiSummaryResponse = await response.json();
      setResultado(data);
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro('Ocorreu um erro inesperado.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🔍 Aba de Pesquisa Rápida (TSX)</h2>
      <p>Digite um tema para ver o resumo dos seus estudos.</p>

      <form onSubmit={buscarNaWikipedia} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Ex: Sistema Solar, Segunda Guerra..."
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }} disabled={carregando}>
          {carregando ? 'Buscando...' : 'Pesquisar'}
        </button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {resultado && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>{resultado.title}</h3>
          
          {resultado.thumbnail && (
            <img 
              src={resultado.thumbnail.source} 
              alt={resultado.title} 
              style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px', margin: '10px 0' }}
            />
          )}
          
          <p style={{ lineHeight: '1.6', textAlign: 'justify' }}>{resultado.extract}</p>
          
          <a 
            href={resultado.content_urls.desktop.page} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#0066cc', textDecoration: 'underline', display: 'block', marginTop: '10px' }}
          >
            Ler artigo completo na Wikipedia →
          </a>
        </div>
      )}
    </div>
  );
}