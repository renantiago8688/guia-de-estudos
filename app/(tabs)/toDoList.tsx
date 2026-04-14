import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTarefas } from '@/hooks/useTarefas';
import { useRouter } from 'expo-router';

export default function App() {
    const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Minhas Matérias</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: React Native"
                    placeholderTextColor="#888" 
                    value={novaTarefa}
                    onChangeText={setNovaTarefa}
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={adicionarTarefa}>
                    <Text style={styles.buttonAddText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tarefaContainer}>
                        <TouchableOpacity 
                            style={styles.clickArea} 
                            onPress={() => router.push({ pathname: '/planejamento', params: { novaMateria: item.texto } })}
                        >
                            <Text style={styles.tarefaTexto}>{item.texto}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.botaoRemover} 
                            onPress={() => removerTarefa(item.id)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Aumenta a área sensível
                        >
                            <Text style={styles.removerTexto}>✕</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );  
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#000' },
    titulo: { fontSize: 26, fontWeight: 'bold', color:'#fff', marginBottom: 20, marginTop: 20 },
    inputContainer: { flexDirection: 'row', marginBottom: 25 },
    input: { flex: 1, height: 55, backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 15, color: '#fff', fontSize: 16 },
    buttonAdd: { backgroundColor: '#fff', width: 55, height: 55, borderRadius: 12, marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
    buttonAddText: { fontSize: 30, fontWeight: 'bold' },
    tarefaContainer: { 
        flexDirection: 'row', 
        backgroundColor: '#1A1A1A', 
        marginBottom: 12, 
        borderRadius: 12, 
        alignItems: 'center',
        overflow: 'hidden' 
    },
    clickArea: { flex: 1, padding: 20 },
    tarefaTexto: { color: '#fff', fontSize: 18, fontWeight: '500' },
    botaoRemover: { 
        width: 60, 
        height: '100%', 
        backgroundColor: '#FF3B30', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    removerTexto: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});