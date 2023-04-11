import React, {useEffect, useState} from 'react';
import Radio from "./components/Form/Radio";
import Button from "./components/Form/Button";
import {type} from "os";

type Perguntas = {
    pergunta: string,
    options: string[],
    id: string,
    resposta: string,
}
type Resposta = {
    [key: string]: any;
}

const perguntas: Perguntas[] = [
    {
        pergunta: 'Qual método é utilizado para criar componentes?',
        options: [
            'React.makeComponent()',
            'React.createComponent()',
            'React.createElement()',
        ],
        resposta: 'React.createElement()',
        id: 'p1',
    },
    {
        pergunta: 'Como importamos um componente externo?',
        options: [
            'import Component from "./Component"',
            'require("./Component")',
            'import "./Component"',
        ],
        resposta: 'import Component from "./Component"',
        id: 'p2',
    },
    {
        pergunta: 'Qual hook não é nativo?',
        options: ['useEffect()', 'useFetch()', 'useCallback()'],
        resposta: 'useFetch()',
        id: 'p3',
    },
    {
        pergunta: 'Qual palavra deve ser utilizada para criarmos um hook?',
        options: ['set', 'get', 'use'],
        resposta: 'use',
        id: 'p4',
    },
];

function extracted(setShowScore: (value: (((prevState: boolean) => boolean) | boolean)) => void, setSlide: (value: (((prevState: string) => string) | string)) => void, newSlide: string, resposta: Resposta, setScore: (value: (((prevState: { total: number; points: number }) => { total: number; points: number }) | { total: number; points: number })) => void, score: { total: number; points: number }) {
    setShowScore(false);
    setSlide(newSlide)
    localStorage.setItem("stage", newSlide);
    const acertos = perguntas.reduce((acc, next) => {
        return next.resposta === resposta[next.id] ? Number(acc) + 1 : acc;
    }, 0)
    setScore({...score, points: acertos});
}

function App() {
    const [resposta, setResposta] = useState<Resposta>({
        p1: "",
        p2: "",
        p3: "",
        p4: ""
    });
    const [slide, setSlide] = useState("p1");
    const [score, setScore] = useState({
            'points': 0,
            'total': 4
    });
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        return () => {
            const base = localStorage.getItem('respostas');
            const stage = localStorage.getItem('stage');
            if (base) setResposta(JSON.parse(base));
            if (stage) setSlide(stage);

        }
    }, []);

    function handleChange({target}: any) {
        const newRespostas = {...resposta, [target.id]: target.value};
        setResposta(newRespostas)
        localStorage.setItem("respostas", JSON.stringify(newRespostas, null, 2))
    }

    function goToNext() {
        if (Number(slide.split('')[1]) < perguntas.length + 1) {
            const newSlide = slide.split('').map((arr, key) => key === 1 ? Number(arr) + 1 : arr).join('');
            extracted(setShowScore, setSlide, newSlide, resposta, setScore, score);
            if (newSlide === 'p5')
                setShowScore(true);
        }
    }

    function goToPrevious() {
        if (Number(slide.split('')[1]) > 1) {
            const newSlide = slide.split('').map((arr, key) => key === 1 ? Number(arr) - 1 : arr).join('');
            extracted(setShowScore, setSlide, newSlide, resposta, setScore, score);
        }
    }

    return (
        <main className='flex justify-center bg-zinc-700 w-full p-4 h-screen text-white'>
            <section className='max-w-xl w-full flex flex-col gap-6 justify-start items-start'>
                {perguntas.filter(pergunta => {
                    return pergunta.id === slide
                }).map(pergunta => {
                    return <Radio key={pergunta.id} id={pergunta.id} handleChange={handleChange}
                                  value={resposta[pergunta.id]} pergunta={pergunta.pergunta}
                                  options={pergunta.options}/>
                })}
                {showScore && <p className='text-3xl'>Seu score: {score.points}/4</p>}
                <div className='flex justify-between gap-3'>
                    <Button onClick={goToPrevious}>Voltar</Button>
                    <Button onClick={goToNext}>Próxima</Button>
                </div>
            </section>
        </main>
    );
}

export default App;
