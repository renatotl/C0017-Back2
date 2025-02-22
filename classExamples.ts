enum TamanhoCaneca {
  PEQUENA,
  MEDIA,
  GRANDE,
}

interface CanecaProps {
  cor: string;
  material: string;
  tamanho: TamanhoCaneca;
  estampa: string;
}

class Caneca {
  public cor: string;
  public material: string;
  public tamanho: TamanhoCaneca;
  public estampa: string;
  private conteudo: string | undefined;

  Beber() {
    if (!this.conteudo) {
      console.log("Caneca vazia");
    }
    if (this.conteudo?.toUpperCase() === "VENENO") {
      console.log("Vou tomar isso não meu patrão");
    }
    if (this.conteudo?.toUpperCase() === "FARINHA") {
      console.log("Estou tentando fazer um bolo");
    }
    return "Que delicia esse " + this.conteudo;
  }
  Encher(conteudo: string) {
    if (!this.conteudo) {
      this.conteudo = conteudo;
    } else {
      console.log("A caneca ta cheia");
    }
  }
  Quebrar() {
    console.log("Foi se a caneca");
  }
  Medir() {
    if (this.conteudo?.toUpperCase() === "FARINHA") {
      console.log("Esse bolo vai ficar top");
    }
  }
}

const canecaDaBlue = new Caneca();

canecaDaBlue.cor = "azul";
canecaDaBlue.tamanho = TamanhoCaneca.GRANDE;
canecaDaBlue.estampa = "Logo da Blue";
canecaDaBlue.material = "Cerâmica";
canecaDaBlue.Encher("Café");
canecaDaBlue.Encher("Veneno");

console.log(canecaDaBlue.Beber());

type PetProps = {
  nome: string;
  especie: string;
  tamanho: string;
  sexo: string;
};
class Pet {
  private name: string;
  private especie: string;
  private tamanho: number;
  private sexo: string;

  constructor({ especie, tamanho, sexo, nome }: PetProps) {
    this.especie = especie;
    this.name = nome;
    this.sexo = sexo;
    this.tamanho = parseFloat(tamanho);
  }

  Comer() {
    console.log("Hmmmm comidinha");
  }
  Evacuar() {
    console.log("Me deixa em paz");
  }
  Andar() {
    console.log("Andando");
  }
  get nome() {
    return this.name;
  }
  set nome(name: string) {
    this.name = name;
  }
}

const Gato = new Pet({
  nome: "Bichano",
  especie: "Gato",
  sexo: "Masculino",
  tamanho: "Pequeno",
});

console.log(Gato.nome);
Gato.nome = "Peco";
console.log(Gato.nome);

interface IAluno {
  dormir: () => string;
  codar: () => string;
  estudar: () => string;
  makeCoffe: (cafe: boolean) => string;
}

class Aluno implements IAluno {
  dormir() {
    return "Sonequinha";
  }
  codar() {
    return "Virando Surfista";
  }
  estudar() {
    return "Aula até amanhecer";
  }
  makeCoffe(cafe: boolean) {
    if (cafe) {
      return "Que delicia cafézinho";
    } else {
      return "No coffe no code";
    }
  }
  Procrastinar() {
    return "To fora codo muito";
  }
}

interface IAnimal {
  correr: () => void;
  comer: () => void;
}

interface IAnimalProps {
  cor: string;
  especie: string;
  tamanho: number;
}

interface ILeao extends IAnimal {
  rugir: () => void;
}

class Animal implements IAnimal {
  private cor: string;
  private especie: string;
  private tamanho: number;

  constructor(animalProps: IAnimalProps) {
    this.cor = animalProps.cor;
    this.especie = animalProps.especie;
    this.tamanho = animalProps.tamanho;
  }

  correr() {
    console.log("correndo");
  }
  comer() {
    console.log("Comendo");
  }
}

class Leao extends Animal implements ILeao {
  rugir() {
    console.log("Rugindo");
  }
}

interface ILeaoEspecifico extends IAnimalProps {
  skill: string;
}

class LeaoEspecifico extends Leao {
  public skill: string;
  constructor(animalProps: ILeaoEspecifico) {
    super(animalProps);
    this.skill = animalProps.skill;
  }

  dancar() {
    console.log("Leão circense");
  }
}

const leao1 = new Leao({ cor: "laranja", especie: "lião", tamanho: 20 });
const alex = new LeaoEspecifico({
  cor: "Verde",
  especie: "Liãobaio",
  tamanho: 30,
  skill: "Dançarino",
});
// contrato
interface ICaneta {
  PorcentagemDeTinta: number;
  cor: string;

  Riscar: () => void;
}

type CanetaProps = {
  cor: string;
  ponta: number;
};
// implementando o contrato minha Caneta precisa ter   PorcentagemDeTinta: number;
  // cor: string;
 
class Caneta implements ICaneta {
  PorcentagemDeTinta: number = 100;
  ponta: number;
  cor: string;

  constructor(props: CanetaProps) {
    this.cor = props.cor;
  }

  Riscar(): void {
    this.PorcentagemDeTinta = this.PorcentagemDeTinta - 0.5;
    console.log("Escrevi na cor: " + this.cor);
    console.log("A tinta atual da caneta agora é: " + this.PorcentagemDeTinta);
  }
}

interface ICanetaMultiColorProps {
  cor: string;
  ponta: number;
  cores: string[];
}

interface ICanetaMultiColor extends ICaneta {
  cores: string[];
}

const canetaBic = new Caneta({ cor: "Azul", ponta: 0.7 });
canetaBic.Riscar();

class CanetaMultiColor extends Caneta implements ICanetaMultiColor {
  cores: string[];
  constructor(canetaMultiColorProps: ICanetaMultiColorProps) {
    super(canetaMultiColorProps);
    this.cores = canetaMultiColorProps.cores;
  }

  trocarCor(corSelecionada: string): void {
    let indice: number = 0;
    this.cores.map((cor, index) => {
      if (cor === corSelecionada) {
        indice = index;
      }
    });
    this.cor = this.cores[indice];
  }
}

const canetaMulticorFaberCastell = new CanetaMultiColor({
  cor: "azul",
  ponta: 0.7,
  cores: ["azul", "verde", "vermelho", "amarelo", "rosa"],
});

canetaMulticorFaberCastell.Riscar();
canetaMulticorFaberCastell.trocarCor("verde");
canetaMulticorFaberCastell.Riscar();
canetaMulticorFaberCastell.trocarCor("rosa");
canetaMulticorFaberCastell.Riscar();
