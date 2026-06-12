import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Linking,
  ActivityIndicator
} from 'react-native';

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
  thumbnail?: WikiThumbnail; 
  content_urls: WikiUrls;
}

export default function PesquisaWikipedia() {
  const [termo, setTermo] = useState<string>('');
  const [resultado, setResultado] = useState<WikiSummaryResponse | null>(null);
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);

  const buscarNaWikipedia = async () => {
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.wrapper}>
        <Text style={styles.titulo}>🔍 Aba de Pesquisa Rápida</Text>
        <Text style={styles.subtitulo}>Digite um tema para ver o resumo dos seus estudos.</Text>

        <View style={styles.form}>
          <TextInput
            value={termo}
            onChangeText={setTermo} 
            placeholder="Ex: Sistema Solar, Segunda Guerra..."
            placeholderTextColor="#888"
            style={styles.input}
            onSubmitEditing={buscarNaWikipedia} 
          />
          <TouchableOpacity 
            style={styles.botao} 
            onPress={buscarNaWikipedia} 
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.txtBotao}>Pesquisar</Text>
            )}
          </TouchableOpacity>
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        {resultado && (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{resultado.title}</Text>
            
            {resultado.thumbnail && (
              <Image 
                source={{ uri: resultado.thumbnail.source }} 
                style={styles.imagem}
              />
            )}
            
            <Text style={styles.cardTexto}>{resultado.extract}</Text>
            
    
            <TouchableOpacity onPress={() => Linking.openURL(resultado.content_urls.desktop.page)}>
              <Text style={styles.link}>Ler artigo completo na Wikipedia →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    backgroundColor: '#25292e',
  },
  wrapper: {
    padding: 20,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center', 
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff', 
  },
  subtitulo: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
  },
  form: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    color: '#000',
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#3d81ff',
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  erro: {
    color: '#ff4d4d',
    marginBottom: 15,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#25292e',
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginVertical: 12,
    resizeMode: 'cover',
  },
  cardTexto: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#333',
  },
  link: {
    color: '#3d81ff',
    textDecorationLine: 'underline',
    marginTop: 15,
    fontWeight: '600',
    fontSize: 15,
  },
});