const selcElement = document.getElementById('personagem');

selcElement.addEventListener('click', function() {
    var personagem = selcElement.value;

    // criando uma função
    async function exibirPokemon(personagem) {
        // tratando erro com o try-catch
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${personagem}`);
            
            if (!response.ok) {
                throw new Error('Pokemon não encontrado ou erro de API.');
            }
            
            const data = await response.json();  

            const nome = data.name;
            const imagem = data.sprites.front_default;  
            
            // obtendo as habilidades
            const habilidades = data.abilities.map(ability => ability.ability.name);
            
            const pokemonDiv = document.getElementById('pokemon');
            pokemonDiv.innerHTML = `
                <h2>${nome}</h2>
                <img src="${imagem}" width="300px" height="300px" alt="${nome}">
                <br>
                <p>Habilidades: ${habilidades.join(', ')}</p>
            `;
        } catch (erros) {
            console.error('Erro: ' + erros);
            const pokemonDiv = document.getElementById('pokemon');
            pokemonDiv.innerHTML = `<p style="color: red;">${erros.message}</p>`;
        }
    }

    
    exibirPokemon(personagem);
});
