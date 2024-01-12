import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [paises, setPaises] = useState([]);
  const [inputPais, setInputPais] = useState('');


  useEffect(() => {
    async function buscarPaises() {
      try {
        const response = await api.get('/all');

        setPaises(response.data.slice(0, 16));
      } catch (error) {
        console.log('Erro ao buscar dados da API ' + error);
      }
    }
    buscarPaises();
  }, []);

  async function pesquisarPorPaises(e) {
    const nomePais = e.target.value;
    setInputPais(nomePais);

    try {
      const response = await api.get(`/name/${nomePais}`);
      setPaises(response.data.slice(0, 16));
    } catch (error) {
      console.log('Erro ao buscar dados da API ' + error);
    }
  }

  async function filtrarPorRegiao(e) {
    const region = e.target.value;

    try {
      const response = await api.get(`/region/${region}`);
      setPaises(response.data.slice(0, 16));
    } catch (error) {
      console.log('Erro ao buscar dados da API ' + error);
    }
  }

  function formatarNumeroComPonto(populacao) {
    // Converte o número para string
    const numeroComoString = populacao.toString();
    const numeroFormatado = numeroComoString.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    );

    return numeroFormatado;
  }

  return (
    <main className="mt-12 max-w-7xl m-auto">
      <form
        onSubmit={pesquisarPorPaises}
        className="flex items-center justify-between max-md:flex-col px-2"
      >
        <input
          className="border w-1/2 text-base outline-none py-2 px-3 max-md:w-full"
          type="text"
          placeholder="Search for a country"
          value={inputPais}
          onChange={pesquisarPorPaises}
        />

        <select
          onChange={filtrarPorRegiao}
          className="border text-base outline-none py-2 px-3 max-md:w-full text-right mt-5"
          id="selecionar"
        >
          <option value="filter">Filter by region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europa">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </form>

      <ul className="grid grid-cols-4 mt-20 gap-10 max-md:grid-cols-1 px-10">
        {paises.map((pais, index) => (
          <li
            className="p-2 flex items-start flex-col gap-2 max-md:items-center shadow-md"
            key={index}
          >
            <img className="h-40 w-80" src={pais.flags.png} alt="" />
            <h2 className="font-bold mt-5">{pais.name.common}</h2>
            <div className="flex flex-col gap-2 max-md:items-center">
              <p>População: {formatarNumeroComPonto(pais.population)}</p>
              <p>Região: {pais.region}</p>
              <p>Capital: {pais.capital}</p>
            </div>
            <Link to={`detalhes/${pais.name.common}`} className="mt-5 w-full bg-slate-600 text-white px-3 py-1 rounded text-center">
              Mais detalhes
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
