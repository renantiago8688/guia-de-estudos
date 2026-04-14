import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useTarefas } from '@/hooks/useTarefas'; // Importante!

export default function Planejamento() {
  const { novaMateria } = useLocalSearchParams();
  const { tarefas } = useTarefas(); // Puxa a lista oficial
  
  // Estado para os horários (indexado pelo texto da matéria para facilitar)
  const [horarios, setHorarios] = useState<{ [key: string]: string }>({});
  
  // Lista local apenas das matérias que o usuário ESCOLHEU planejar
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  // Quando o usuário clica em uma matéria na ToDoList
  useEffect(() => {
    if (novaMateria && typeof novaMateria === 'string') {
      if (!selecionadas.includes(novaMateria)) {
        setSelecionadas(prev => [...prev, novaMateria]);
      }
    }
  }, [novaMateria]);

  const listaParaExibir = tarefas.filter(t => selecionadas.includes(t.texto));

  const atualizarHorario = (materia: string, texto: string) => {
    setHorarios(prev => ({ ...prev, [materia]: texto }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cronograma</Text>
      
      <FlatList
        data={listaParaExibir} // Usa a lista filtrada em tempo real
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.materiaNome}>{item.texto}</Text>
                <Text style={styles.tag}>
                   {horarios[item.texto] ? 'Definido' : 'Pendente'}
                </Text>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="Digite o horário..."
              placeholderTextColor="#666"
              value={horarios[item.texto] || ''} 
              onChangeText={(txt) => atualizarHorario(item.texto, txt)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Selecione matérias na sua lista para planejar.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', padding: 25 },
    titulo: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 25, marginTop: 40 },
    card: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    materiaNome: { color: '#fff', fontSize: 20, fontWeight: '600' },
    tag: { color: '#FFCC00', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
    input: { backgroundColor: '#000', color: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#444' },
    vazio: { color: '#555', textAlign: 'center', marginTop: 100, fontSize: 16 }
});