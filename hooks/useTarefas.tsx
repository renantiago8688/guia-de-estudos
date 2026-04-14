import { useState, useEffect } from 'react';

interface Tarefa {
    id: string;
    texto: string;
}

let tarefasGlobais: Tarefa[] = [];
let ouvintes: any[] = []; // Lista de funções para avisar as telas que mudou

export function useTarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasGlobais);
    const [novaTarefa, setNovaTarefa] = useState<string>('');

    // Sincroniza o estado local com o global
    useEffect(() => {
        ouvintes.push(setTarefas);
        return () => {
            ouvintes = ouvintes.filter(o => o !== setTarefas);
        };
    }, []);

    const atualizarTudo = (novaLista: Tarefa[]) => {
        tarefasGlobais = novaLista;
        ouvintes.forEach(o => o(novaLista));
    };

    const adicionarTarefa = () => {
        if (novaTarefa.trim() === '') return;
        const nova = { id: Date.now().toString(), texto: novaTarefa };
        atualizarTudo([...tarefasGlobais, nova]);
        setNovaTarefa('');
    };

    const removerTarefa = (id: string) => {
        atualizarTudo(tarefasGlobais.filter((t) => t.id !== id));
    };

    return { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa };
}